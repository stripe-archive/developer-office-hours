// Replace if using a different env file or config
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.use(express.static(process.env.STATIC_DIR));
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get('/setup_intents', async (req, res) => {
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'],
    usage: 'off_session',
  });

  res.json(setupIntent);
});

const monthsFromNow = (n) => {
  var d = new Date();
  return Math.floor(d.setMonth(d.getMonth() + n) / 1000);
}

const PLANS = [
  null,
  'fancy-bike-1',
  'fancy-bike-2',
  'fancy-bike-3',
]

app.post('/buy', async (req, res) => {
  let customer, subscription;
  // Create customer
  try {
    console.log('Creating customer...');
    customer = await stripe.customers.create({
      email: req.body.email,
      payment_method: req.body.payment_method,
      invoice_settings: {
        default_payment_method: req.body.payment_method,
      },
    });
    console.log('Created customer', customer.id);
  } catch (e) {
    console.log(e);
    return res
      .status(422)
      .json({
        message: 'Failed to create customer',
        details: e
      });
  }

  // Create subscription
  try {
    console.log('Creating a subscription...')
    subscription = await stripe.subscriptions.create({
      customer: customer.id,
      cancel_at: monthsFromNow(req.body.installments), // N months into the future.
      off_session: true,
      items: [{
        plan: PLANS[req.body.installments],
        quantity: 1,
      }]
    });
    console.log('Created subscription ' + subscription.id)
  } catch (e) {
    console.log(e);
    return res
      .status(422)
      .json({
        message: 'Failed to create subscription',
        details: e
      });
  }

  res.json(subscription);
});


// Stripe requires the raw body to construct the event
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'invoice.payment_succeeded':
        // Send goods.
        // Send an email thanking the customer for payment.
        // API calls to IMS
        // post slack.
        invoice = event.data.object;
        console.log('Fulfilling purchase for ' + invoice.id);

        break;
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
