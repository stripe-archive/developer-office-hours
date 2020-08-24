# Checkout Wine Shipment - Office Hours 2020-05-07

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=-uqy3wquhCM)

## Requirements
* Node v10+ and npm v6+
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a Stripe account](https://dashboard.stripe.com/register)
* [API keys for your account](https://stripe.com/docs/keys)

## How to run

This project uses [Express](http://expressjs.com) as its server. Here's how to run it after cloning.

1. Create and populate a `.env` file. There's a starter example you can copy in `server/`.

```
cp server/example.env server/.env
# Then open server/.env in your text editor and paste in the API keys for your account.
```

2. Install dependencies and start up the server.

```
cd server/
npm install
npm start
```

3. Go in your browser `http://localhost:4242` to see the demo

## More resources
* [The first Checkout episode of Office Hours](https://github.com/stripe-samples/developer-office-hours/blob/master/2019-11-21-checkout)
* [The Node.js Express Starter episode](https://www.youtube.com/watch?v=rPR2aJ6XnAc)
* Checkout Docs
  * [Accepting a one-time payment](https://stripe.com/docs/payments/checkout/one-time)
  * [Customizing your integration, and shipping address collection](https://stripe.com/docs/payments/checkout/customization)
  * [Fulfillment options](https://stripe.com/docs/payments/checkout/fulfillment)
* [Guidelines for certain restricted products on Stripe, including alcohol](https://stripe.com/restricted-businesses)
