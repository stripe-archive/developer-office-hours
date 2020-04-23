const express = require('express');
const fs = require('fs');
const app = express();
const { resolve } = require('path');
// Copy the .env.example in the root into a .env file in this folder
require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.set('view engine', 'ejs');
app.set('views', resolve(process.env.STATIC_DIR));
app.use(express.static(process.env.STATIC_DIR));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.get('/config', (req, res) => {
  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    basePrice: process.env.BASE_PRICE,
    currency: process.env.CURRENCY,
  });
});

app.get('/terms', async (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/terms.html');
  return res.sendFile(path)
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.get('/disputes/:id', async (req, res) => {
  const dispute = await stripe.disputes.retrieve(req.params.id);
  res.render('dispute', { dispute: dispute })
});

app.put('/disputes/:id', async (req, res) => {
  const evidence = {
    uncategorized_text: req.body.uncategorized_text,
  }

  if(req.body.standard === 'COVID') {
    const fp = fs.readFileSync('../gov.pdf');
    const upload = await stripe.files.create({
      file: {
        data: fp,
        name: 'gov.pdf',
        type: 'application.octet-stream',
      },
      purpose: 'dispute_evidence',
    });
    evidence.uncategorized_file = upload.id;
  }

  const dispute = await stripe.disputes.update(
    req.params.id,
    {
      evidence: evidence,
      submit: true,
    }
  );

  res.json(dispute);
});

app.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity, locale } = req.body;
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [payment_intent_data] - lets capture the payment later
  // [customer_email] - lets you prefill the email input in the form
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(', '),
    locale: locale,
    line_items: [
      {
        name: 'Pasha photo',
        images: ['https://picsum.photos/300/300?random=4'],
        quantity: quantity,
        currency: process.env.CURRENCY,
        amount: process.env.BASE_PRICE, // Keep the amount on the server to prevent customers from manipulating on client
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
  });

  res.send({
    sessionId: session.id,
  });
});

const PROD_DESC = `Unique one of a kind digital photo from pasha`;
const REFUND_DISCLOSURE = `The refund policy is shown at checkout time in terms and conditions`;
const REFUND_EXPLANATION = `Once the image is downloaded, we don't offer refunds.`;

const CUSTOMER = [{
  billing_address: '123 Main St, Reno, NV, 89436',
  name: 'Jenny Rosen',
  email: 'jenny.rosen@example.com',
  purchase_ip: '127.0.0.1',
  access_activity_log: `April 1, 2020 at 11:04 AM PST - accessed /images/pasha.png`,
}]

const backfillDispute = async (d) => {
  // lookup customer in db.
  const customer = CUSTOMER[0];
  const evidence = {
    product_description: PROD_DESC,
    refund_policy_disclosure: REFUND_DISCLOSURE,
    refund_refusal_explanation: REFUND_EXPLANATION,
    billing_address: customer.billing_address,
    customer_name: customer.name,
    customer_email_address: customer.email,
    customer_purchase_ip: customer.purchase_ip,
    access_activity_log: customer.access_activity_log,
  };

  if(!d.evidence.refund_policy) {
    const fp = fs.readFileSync('../terms.pdf');
    const upload = await stripe.files.create({
      file: {
        data: fp,
        name: 'terms.pdf',
        type: 'application.octet-stream',
      },
      purpose: 'dispute_evidence',
    });
    evidence.refund_policy = upload.id; // file_xxx
  }

  const dispute = await stripe.disputes.update(
    d.id,
    {
      evidence: evidence,
      submit: false,
    }
  );
  return dispute;
}

// Webhook handler for asynchronous events.
app.post('/webhook', async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    console.log(`🔔  Payment received!`);
  }
  if (eventType === 'charge.dispute.created') {
    console.log(`🔔  Payment disputed!`);

    await backfillDispute(data.object);
  }

  res.sendStatus(200);
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
