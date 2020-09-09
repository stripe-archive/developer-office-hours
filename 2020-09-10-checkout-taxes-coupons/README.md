# Stripe Checkout

Learn how to integrate [Stripe Checkout](https://stripe.com/docs/checkout). The
quickest way to start taking payments in an optimized way.

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=UjcSWxPNo18)


# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes.

### Prerequisites
* Node.js
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)

## Quick Start Steps

1. Download and Install dependencies

```sh
git clone git@github.com:stripe-samples/developer-office-hours.git
cd developer-office-hours/2020-09-10-checkout-taxes-coupons
npm install
```

2. Update API keys

Add your [Stripe API keys](https://dashboard.stripe.com/test/apikeys) to the
`server/.env` file.

3. Start server

```sh
npm server
```

4. Browse to `http://localhost:4242`

--- 

## Full Guide

#### Presenters: 

[**Mari Puncel**](https://twitter.com/maripuncel) Engineering Manager on the Stripe Checkout team

[**CJ Avilla**](https://twitter.com/cjav_dev) Stripe Developer Advocate

If you’re ready to start taking payments and want to get up and running quickly, Stripe Checkout is a great place to start. Whether you’re a technical founder working on spinning up a side project or a dev working for a multinational online marketplace, accepting payments and more importantly optimizing for conversion is a critical component to your business.

We're delighted to share several newly released features with you. Today you’ll see an overview of Stripe Checkout, then we’ll show how to build a simple Checkout integration to accept one time payments, and finally to refactor that to support Subscriptions.

Accepting payments with Stripe Checkout consists of two steps (1) creating a session for what your customer intends to purchase, and (2) redirecting your customer to a Stripe-hosted payment form to complete their purchase. Later you can optionally add a webhook handler to automate fulfillment of a purchase.

This is an example of [creating the Checkout Session](https://stripe.com/docs/api/checkout/sessions/create) on the server. Here we’re using the [stripe-node](https://github.com/stripe/stripe-node) client library. 

```js
const stripe = require('stripe')('sk_test_');

const session = await stripe.checkout.sessions.create({
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
  payment_method_types: ['card'],
  line_items: [
    {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
  ],
  mode: 'payment',
});
```

First we configure the library with our Stripe secret key, then we make an API call to create the Checkout Session object. Once the response is returned from the API that `session` variable will contain the data including an ID that is used to redirect from the frontend. 

It’s at this session creation time that we can configure what the customer is paying for. For instance, we might change that mode from `payment` to `subscription` to start a subscription. Or add `ideal` to the list of supported `payment_method_types`.

---

This is an example of redirecting to Checkout on the frontend. We’re using Stripe.js here. First we initialize an instance of the Stripe object using our Stripe publishable key, then we call `redirectToCheckout` and pass in the ID of the session we got back from the API earlier. 

```js
var stripe = Stripe('pk_test_');
stripe.redirectToCheckout({
  sessionId: '{{ sesison.id }}' // this is the ID returned earlier from the API.
}).then(function(result) {
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
});
```

For most cases, this is the only code required on the frontend and is purely for redirecting to that Checkout Session we created on the server.

Let’s implement accepting a basic one time payment. Then add a proof of concept showing how you might implement fulfillment using webhook events. Finally we’ll refactor our implementation to start a subscription to collect recurring payments.

I have already installed and linked the [Stripe CLI](https://stripe.com/docs/stripe-cli) with my Stripe account, if you’re new to the Stripe CLI we have an [episode](https://www.youtube.com/watch?v=Psq5N5C-FGo) dedicated to getting up and running.

From the terminal, we run `stripe samples create developer-office-hours`.

If you’re curious about how to setup basic routes, or how these Stripe Samples work with environment variables, checkout those [episodes](https://www.youtube.com/watch?v=rPR2aJ6XnAc) in the [Foundations playlist](https://www.youtube.com/playlist?list=PLy1nL-pvL2M4N3kfPoZ0igtbMj3K3Jdr_) of the [Stripe Developers YouTube channel](https://www.youtube.com/channel/UCd1HAa7hlN5SCQjgCcGnsxw).


Let’s jump into that server directory, npm install some dependencies and fire up the server.

```sh
cd server
npm install
npm start
```

When opening http://localhost:4242 in the browser, you should see the boiler plate for Stripe Developer Office Hours. From here, there are a couple different approaches you might take. You can either create the Checkout Session on page load or you can create the Checkout Session "just in time." If you know ahead of time exactly what the customer intends to purchase, you could create the Checkout Session as part of the request to fetch this payment page, then server side render the ID of the Checkout Session directly into your inline JavaScript.

If the customer will provide any input that will change their checkout experience, you’ll want to create the Checkout Session just before redirecting. 

For the example today, we’ll add an input so the customer can enter a quantity for the number of items (or seats in the case of Subscriptions) they would like to purchase. Then, when the form is submitted, we’ll send an AJAX request to our server which will create the checkout session and return it’s ID so we can redirect on the client.

Let’s add a route to the server that will accept a POST request to create a Checkout Sessions.

I’m going to stop the server, open server.js and add a route here for `/create-checkout-session`.

We start with just this empty route.

```js
app.post('/create-checkout-session', async (req, res) => {
 
  res.json({ });
});
```

Here we’ll make an API request to Stripe to configure a new Checkout Session. Note that each time a customer goes through Checkout, we need to create a new session. It’s not possible to “reuse” these and it’s fine if you create some Checkout Sessions that are never used. 


```js
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
```

Let’s start with some of the top level parameters.

```js
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:4242/success?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4242/cancel',
    payment_method_types: ['card'],
    mode: 'subscription',
```

`success_url` is where customers will be redirected back to after completing their purchase.

`cancel_url` is where the customer will be redirected back to if they bail out of the payment flow from the Checkout page.

`payment_method_types` is the list of payment method types, refer to the API ref for the full list, this is always growing. Mari and the Checkout team are always adding new payment method types.

`mode` is one of `payment` for one time payment, `subscription` for recurring payments, or `setup` for just collecting payment method details, but not actually charging.



Next we need to add a list of one or more line items. This is a little newer. You may have noticed that display items was removed in the recent 2020-08-27 API version and that sku’s are also deprecated. Going forward, you’ll want to use line items with the new Price object.

For most cases, you’ll want to load your inventory into Stripe as Products and the prices for each of those products. 

Products describe the specific goods or services you offer to your customers.

Prices can be either one time or recurring. And a price represents how much a product cost, in a given currency, and for an (optional) billing interval. 

It’s worth mentioning that if you’re customers pay a variable price, for instance if you’re building a donation platform, where the unit amount collected is defined by the customer, you might want to take a look at the price_data parameter where the price is defined on the fly. A best practice for reporting and inventory tracking is to actually create products and prices in your Stripe account. 

For this segment of the demo, we’ll need a product and a one time price, so let’s create that with the Stripe CLI.

First we create a product with 

Stripe products create --name demo

Copy that product ID into server.js

stripe prices create --unit-amount 999 --currency USD --product prod_HwwXgpxK10TlMV

I’m also going to export that so we have it around in our terminal later.
export PROD=prod_HwwXgpxK10TlMV

Now that we have a price ID we can finish configuring the Checkout Session.

We set the price to the ID of the price we just created, set the quantity based on the request or 0, and finally, render back a simple json object with just the ID of the Checkout Session.

Now that the route is working as expected on the server, we can go to the client to add a button to trigger this endpoint and ultimately redirect.







app.get("/success", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.sendFile(path);
});

app.get('/checkout-session', async (req, res) => {
  console.log(req.query);
  const session = await stripe.checkout.sessions.retrieve(req.query.id);
  res.json(session);
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:4242/success?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4242/cancel/',
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price: 'price_1HN2fMCZ6qsJgndJZdagcfJw',
      quantity: req.body.quantity || 1,
    }]
  });
  res.json({
    id: session.id,
  });
});

Tax Rates

As Mari mentioned in the overview, one of the most requested features is support for Taxes. To enable taxes in Checkout, we first need to create a tax rate object.

When applying tax rates, Stripe calculates the total tax amount per tax rate, summarizing it in a table of the collected tax rates and amounts, and ultimately, into exported tax summary reports.

Let’s create a tax rate with the Stripe CLI

We say

stripe tax_rates create 

--display-name "Sales Tax" 

--jurisdiction "CA - SF" 

--percentage 8.5 

--inclusive false (meaning it’s not included in the overall amount)

Now we can take this tax rate ID and pass that in the tax_rates field for the line_item when configuring the session. 

The next feature we’ll look at is called dynamic tax rates. It’s in beta at the time of this recording. I’m very excited to share it with you and if you’d like early access, please reach out if you’d like to participate in the beta.

With fixed tax rates Checkout will use whatever tax rate we pass in as the fixed tax rate to apply to the session. With dynamic tax rates, the tax rate is selected based on the address entered by the customer.

In order for dynamic tax rates to work, they require two extra parameters when creating the tax rate: country and state. Note that these params are also in beta.
Let’s create two new tax rates, one each for San Francisco and New York City.

For dynamic tax rates, we’ll pass these in the new dynamic_tax_rates field.

Stay tuned to @stripedev on twitter for an announcement for when dynamic tax rates are generally available.


Coupons

Let’s talk discounts.

Coupons are merchant-facing objects you can use to control discounts on subscriptions or invoices. 

Promotion codes are customer-facing codes that are created on top of coupons and can be shared directly with your customers.

First we create a coupon to define how much to discount as a percent off or a flat amount off of the original price. They can be applied per-customer or per-subscription. 

We can create a coupon from the CLI with the following:

Stripe coupons create 

It’s possible to apply a coupon directly to a Subscription with the coupon field in the subscription_data hash. You might do this if you know the coupon to apply for a specific Checkout Session ahead of time. 

If you want to allow customers to enter their own codes, we need to create a promotion code from a coupon and enable the Checkout session to accept promotion codes.



If you’re catching this later and would like to engage with us live, follow us on Twitter [@StripeDev](https://twitter.com/stripedev) for updates and announcements about upcoming Stripe Developer Office Hours.
