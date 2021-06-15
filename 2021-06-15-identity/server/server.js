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

app.post('/create-verification-session', async (req, res) => {
  const session = await stripe.identity.verificationSessions.create({
    type: 'document',
    options: {
      document: {
        require_matching_selfie: true
      },
    }
  })

  res.json({ clientSecret: session.client_secret });
});

// Stripe requires the raw body to construct the event
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
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

    let session;
    switch(event.type) {
      case 'identity.verification_session.verified':
        // Send an email to the user letting them know they are verified.
        // Update the database marking the user as verified
        session = event.data.object;
        const expandedSession = await stripe
          .identity
          .verificationSessions
          .retrieve(
            session.id, {
              expand: ['verified_outputs'],
            }
          )
        console.log(expandedSession);
        break;
      case 'identity.verification_session.requires_input':
        // The document had at least one check fail
        // Consider blocking the user and/or removing access
        // Consider emailing the user to suggest they re-submit
        // Let the user know implications of failing identity check failure.
        session = event.data.object;
        console.log(session);
        switch(session.last_error.code) {
          case 'document_expired':
            // This is a common use-case, email the user to
            // let them know their document is expired.
            console.log("Send document expired email");
            break;
          case 'document_unverified_other':
            console.log("Send generic verification failed email");
            break;
          case 'document_type_not_supported':
            // The provided document isn't in one of the session's
            // allowed document types
            console.log("Send unsupported document type email");
          default:
            console.log("Raise an exception to the dev team :)");
        }
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
