const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_***");

const app = express();

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    // Simple deserialization:
    // const event = JSON.parse(req.body);
    // console.log(event.type);
    // console.log(event.data.object);
    // console.log(event.data.object.id);

    // With signature verification:
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    const endpointSecret = "whsec_***";

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false });
      return;
    }

    console.log(event.type);
    console.log(event.data.object);
    console.log(event.data.object.id);

    res.json({ success: true });
  }
);

app.listen(4242, () =>
  console.log(`Node server listening on http://localhost:4242`)
);
