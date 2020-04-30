// Replace if using a different env file or config
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const PRODUCT_LIST = {
  a: {
    name: 'Red wine',
    description: 'A full-bodied red',
    amount: 1500,
    // Photo by Kelsey Knight on Unsplash
    images: ['https://i.imgur.com/PRUuYjE.jpg']
  },
  b: {
    name: 'White wine',
    description: 'The perfect white wine for your summer barbecues',
    amount: 1200,
    // Photo by Matthieu Joannon on Unsplash
    images: ['https://i.imgur.com/MR3CucS.jpg']
  },
  c: {
    name: 'Grab bag case',
    description: 'A wine omakase. This is a cost-effective case of our current favorites.',
    amount: 9900,
    // Photo by chuttersnap on Unsplash
    images: ['https://i.imgur.com/IHOSKqR.jpg']
  }
};

app.use(express.static(process.env.STATIC_DIR));
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// Use EJS for templating
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render('index', { products: PRODUCT_LIST });
});

app.get("/success", (req, res) => {
  res.render('success');
});

app.post("/create-checkout-session", async (req, res) => {
  const domainUrl = process.env.DOMAIN;
  const { productSelections } = req.body;

  const lineItems = Object.entries(productSelections).map(([id, quantity]) => {
    return {
      ...PRODUCT_LIST[id],
      quantity: quantity,
      currency: 'usd',
    }
  });

  // Create new Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    line_items: lineItems,
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainUrl}`,
  });

  res.json({
    sessionId: session.id,
  });
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
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

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
