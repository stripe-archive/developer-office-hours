# Developer office hours - Stripe Checkout

[Checkout](https://stripe.com/checkout) creates a secure, Stripe-hosted payment page that lets you collect payments quickly. It works across devices and is designed to increase your conversion. The following guide covers our office hours session on September 10, 2020.

> Learn how to integrate [Stripe Checkout](https://stripe.com/docs/checkout):
>
> - [🎬 Watch the developer office hours on YouTube](https://www.youtube.com/watch?v=UjcSWxPNo18)
> - [💳 Preview Checkout directly from the docs](https://stripe.com/docs/payments/checkout)

---

**Presenters:**

- [**Mari Puncel**](https://twitter.com/maripuncel) - Engineering Manager, Stripe Checkout

- [**CJ Avilla**](https://twitter.com/cjav_dev) - Developer Advocate @ Stripe

### Developer introduction [🎬](https://www.youtube.com/watch?v=UjcSWxPNo18&t=5s)

If you’re ready to start taking payments and want to get up and running quickly, Stripe Checkout is a great place to start. Whether you’re a technical founder working on spinning up a side project or a dev working for a multinational online marketplace, accepting payments, and more importantly optimizing for conversion is a critical component to your business.

We're delighted to share several newly released features with you. Today you’ll see an overview of Stripe Checkout, then we’ll show how to build a simple Checkout integration to accept one-time payments, and finally to refactor that to support Subscriptions.

Accepting payments with Stripe Checkout consists of two steps (1) creating a session for what your customer intends to purchase, and (2) redirecting your customer to a Stripe-hosted payment form to complete their purchase. Later you can optionally add a webhook handler to automate the fulfillment of a purchase.

### Product overview [🎬](https://youtu.be/UjcSWxPNo18?t=80)

Checkout is a hosted payment page designed to make it easy for you to begin accepting payments and offers flexible, scalable features to help your business grow. We often hear from our users that they underestimate how much work it will take to build and maintain a first-class payment experience.

Our goal with Checkout is to help you save time by providing a prebuilt solution that fits into your flow and maximize your conversion rates. For example, Checkout will show the correct payment method based on your customer’s geography, or offer address autocomplete for payment details - all this to say we're constantly experimenting and developing improvements to the conversion funnel.

![Checkout overview](https://stripe.com/img/docs/checkout/overview.gif)

This is what your customer will experience when they are going through the payment process in Checkout. You can see here some branding options like background color and logo that are enabled to customize the look and feel to match your site.

**Demo - try for yourself**

> [💳 Preview Checkout directly from the docs](https://stripe.com/docs/payments/checkout)

---

## Developer walkthrough

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes.

### Prerequisites

- [Create a stripe account](https://dashboard.stripe.com/register)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [Node.js](https://nodejs.org/en/download/)
- [Stripe CLI](https://github.com/stripe/stripe-cli/)

### Create a checkout session on the server [🎬](https://youtu.be/UjcSWxPNo18?t=303)

This is an example of [creating the Checkout Session](https://stripe.com/docs/api/checkout/sessions/create) on the server. Here we’re using the [stripe-node](https://github.com/stripe/stripe-node) client library.

```js
const stripe = require("stripe")("sk_test_abc123");

const session = await stripe.checkout.sessions.create({
  success_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel",
  payment_method_types: ["card"],
  line_items: [{ price: "price_H5ggYwtDq4fbrJ", quantity: 2 }],
  mode: "payment",
});
```

First we configure the library with our Stripe secret key, then we make an API call to create the Checkout Session object. Once the response is returned from the API that `session` variable will contain the data including an ID that is used to redirect from the frontend.

Remember at this session creation time is when we configure what the customer is paying for. For instance, we might change that mode from `payment` to `subscription` to start a subscription. Or add `ideal`, a payment method popular in the Netherlands, to the list of supported `payment_method_types`.

---

### Redirecting to Checkout on the frontend [🎬](https://youtu.be/UjcSWxPNo18?t=343)

```js
<script src="https://js.stripe.com/v3/"></script>

<script>
  var stripe = Stripe("pk_test_789xyz");
  stripe.redirectToCheckout({
    sessionId: session.id
  });
</script>
```

Above is an example of redirecting to Checkout on the frontend. We’re using Stripe.js and first, we initialize an instance of the Stripe object using our [publishable key](https://stripe.com/docs/keys), then we call `redirectToCheckout` and pass in the ID of the session we received from the API earlier.

For most cases, this is the only code required on the frontend and is purely for redirecting to that Checkout Session we created on the server.

### One time payments with Checkout [🎬](https://youtu.be/UjcSWxPNo18?t=368)

Let’s implement accepting a basic one-time payment. Then we will show how you might choose to implement fulfillment using webhook events. Finally, we’ll refactor our implementation to start a subscription to collect recurring payments.

> 💡**Required: Install the Stripe CLI**
>
> To continue, remember to install and link the [Stripe CLI](https://stripe.com/docs/stripe-cli) with a Stripe account.
>
> If you’re new to the Stripe CLI or are unfamiliar with command-line interfaces in general, we have an [office hours episode](https://www.youtube.com/watch?v=Psq5N5C-FGo) to get up and running.

**Launch the Checkout sample** [🎬](https://youtu.be/UjcSWxPNo18?t=384)

From the terminal, run the following command:

```bash
stripe samples create developer-office-hours
```

For this walkthrough, choose `Node` as the backend from the list shown in the CLI. Next, you'll open the server directory, npm install some dependencies, and fire up the server.

```sh
cd developer-office-hours
cd server
npm install
npm start
```

You will know this step was successful when the CLI says `Node server listening on port 4242!`

**Localhost starter page** [🎬](https://youtu.be/UjcSWxPNo18?t=446)

Open http://localhost:4242 in the browser to find the "boilerplate" start template for Developer Office Hours. For the next steps, there are two paths you can choose to take:

- 🅰️ **Preloaded:** Create the Checkout Session on as the web page loads
  - 👉 If you know ahead of time exactly what the customer intends to purchase, you can create the Checkout Session as part of the request in order to fetch this payment page. Following this step, the server-side renders the ID of the Checkout Session directly into your inline JavaScript.

- 🅱️ **Async:** Create the Checkout Session "just in time", which creates the Checkout Session the moment a customer takes action.
  - 👉 If the customer will provide any input that will change their checkout experience, you’ll want to create the Checkout Session just before redirecting.

**Editing the starter office hours page** [🎬](https://youtu.be/UjcSWxPNo18?t=497)

For the example today, we’ll add an input so the customer can enter a quantity for the number of items (or seats in the case of Subscriptions) they would like to purchase. Once the form is submitted, we’ll send an AJAX request to our server to create the Checkout Session and return it's ID in order for us to redirect on the client.

Let’s add a route to the server that will accept a POST request to create a Checkout Session.

I’m going to stop the server, open `server.js`, and then add a route for `/create-checkout-session`. For now, we'll start with just this empty route:

```js
app.post("/create-checkout-session", async (req, res) => {
  res.json({});
});
```

**Create a new checkout session** [🎬](https://youtu.be/UjcSWxPNo18?t=516)

```js
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
```

Here we’ll make an API request to Stripe to configure a new Checkout Session. Note that each time a customer goes through Checkout, we need to create a new session. It’s not possible to "reuse" these and it is ok to create multiple Checkout Sessions while testing.

Let’s start with some of the top-level parameters.

```js
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:4242/success?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4242/cancel',
    payment_method_types: ['card'],
    mode: 'payment',
```

A few items to observe in the code snippet above:

- `success_url` is where customers will be redirected back to after completing their purchase.
- `cancel_url` is where the customer will be redirected back to if they bail out of the payment flow from the Checkout page.
- `payment_method_types` is the list of payment method types and the list of Checkout supported methods are in full on our [API reference docs](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-payment_method_types).
- `mode` can be one of the following:
  - `payment` for one-time payments
  - `subscription` for recurring payments
  - or `setup` for collecting payment method details, without charging.

**Prices and line items** [🎬](https://youtu.be/UjcSWxPNo18?t=672)

Next, we need to add a list of one or more `line_items`. This parameter is new and has replaced display items and SKUs as of the `2020-08-27` API version.
Moving forward, you’ll want to use `line_items` with the new [`Price`](https://stripe.com/docs/api/prices) object when setting up payments.

**Creating products in the dashboard or API**

For most cases, you’ll want to load your inventory into Stripe as [Products](https://stripe.com/docs/api/products) and create corresponding Prices for each of those Products.

**Understanding the correlation between Products & Prices**

- Products describe the specific goods or services you offer to your customers.
- Prices can be either one-time or recurring.
  - Price represents how much a Product costs, in a given currency, and for an (optional) billing interval.

It’s worth mentioning that if your customers pay a variable price, for instance, if you’re building a donation platform, where the unit amount collected is defined by the customer then you might want to take a look at the `price_data` parameter where the Price is defined in real-time.

> 💡 Read our [product and prices guide](https://stripe.com/docs/billing/prices-guide) for a full walkthrough

A best practice for reporting and inventory tracking is to actually create Products and Prices in your Stripe account. You can do this either with the API or directly in your [Stripe Dashboard](https://dashboard.stripe.com/products).

### Creating product and prices using the Stripe CLI [🎬](https://youtu.be/UjcSWxPNo18?t=756)

For this segment of the demo, we’ll need a Product and a one-time Price, so let’s create that with the Stripe CLI.

First we create a product with the following terminal commands:

```sh
stripe products create --name demo
```

From here, the following response will be returned:

```json
{
  "id": "prod_HzZBX2ah9uNJl5",
  "object": "product",
  "active": true,
  "attributes": [],
  "created": 1599683860,
  "description": null,
  "images": [],
  "livemode": false,
  "metadata": {},
  "name": "demo",
  "statement_descriptor": null,
  "type": "service",
  "unit_label": null,
  "updated": 1599683860
}
```

Next up, copy the product ID (`prod_HzZBX2ah9uNJl5`) in order to create a Price for that Product:

```sh
stripe prices create \
  --unit-amount 999 \
  --currency USD \
  --product prod_HzZBX2ah9uNJl5
```

If successful, you should see the following response:

```json
{
  "id": "price_1HPa4BKoPpUdiYpL2KJs6hfg",
  "object": "price",
  "active": true,
  "billing_scheme": "per_unit",
  "created": 1599683935,
  "currency": "usd",
  "livemode": false,
  "lookup_key": null,
  "metadata": {},
  "nickname": null,
  "product": "prod_HzZBX2ah9uNJl5",
  "recurring": null,
  "tiers_mode": null,
  "transform_quantity": null,
  "type": "one_time",
  "unit_amount": 999,
  "unit_amount_decimal": "999"
}
```

Now that we have a Price ID (`price_1HPa4BKoPpUdiYpL2KJs6hfg`) we can finish configuring the API call in server.js to create a Checkout Session.

We set the `price` to the ID of the Price we just created, set the quantity based on the request or 1.

```js
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:4242/success?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4242/cancel',
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price: 'price_1HPa4BKoPpUdiYpL2KJs6hfg',
      quantity: req.body.quantity || 1,
    }],
  });
```

Finally, render back a simple json object with just the ID of the Checkout Session.

```js
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:4242/success?id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:4242/cancel",
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price: "price_1HPa4BKoPpUdiYpL2KJs6hfg",
        quantity: req.body.quantity || 1,
      },
    ],
  });
  res.json({
    id: session.id,
  });
});
```

### Adding a purchase button to the frontend [🎬](https://youtu.be/UjcSWxPNo18?t=927)

Now that the route is working as expected on the server, we can go to the frontend to add a button to trigger this endpoint and ultimately redirect.

We'll be using HTML and vanilla JavaScript on the client.

Add a button tag and a quantity input to the body of the HTML. We're pre-populating the value to 3 here so that we don't need to enter a value when testing. We'd remove that value after we're done with testing locally:

```html
<input id="quantity" type="number" step="1" value="3"/>
<button id="btn">Pay</button>
```

Install Stripe.js before our inline JavaScript will run:

```html
<script src="https://js.stripe.com/v3/"></script>
```

In our inline `script` tag, we'll grab reference to the `input` and `button` then add a click handler:

```html
<script charset="utf-8">
  var button = document.getElementById("btn");
  var quantity = document.getElementById("quantity");
  button.addEventListener("click", function (e) {
    e.preventDefault();
  });
</script>
```

**Creating the Checkout Session** [🎬](https://youtu.be/UjcSWxPNo18?t=960)

Inside the click handler is where we'll make the AJAX call to the server to create the Checkout Session. This allows us to pass in any other user input that we might use to configure the Checkout Session. For instance, we might collect the currency or some other product options and pass those to the server here so that we can customize the Checkout Session further:

```html
<script charset="utf-8">
  var stripe = Stripe("pk_test_vAZ3gh1LcuM7fW4rKNvqafgB00DR9RKOjN");
  var button = document.getElementById("btn");
  button.addEventListener("click", function (e) {
    e.preventDefault();
    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity.value,
      }),
    })
      .then((response) => response.json())
      .then((session) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  });
</script>
```

Finally, we redirect to Checkout using the ID of the `session` response from our server.

```html
<script charset="utf-8">
  var stripe = Stripe("pk_test_");
  var button = document.getElementById("btn");
  button.addEventListener("click", function (e) {
    e.preventDefault();
    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity.value,
      }),
    })
      .then((response) => response.json())
      .then((session) => {
        stripe.redirectToCheckout({ sessionId: session.id }); // this causes a redirect to the Stripe hosted Checkout page.
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
</script>
```

### Relaunch the localhost sample with the changes [🎬](https://youtu.be/UjcSWxPNo18?t=1107)

If the server and client are working as expected you should be able to restart the server with `npm start`, open http://localhost:4242, and walk through the payment flow.

Try entering the standard test card `4242424242424242`. Then try with one of the SCA test cards like `4000002500003155` to see the experience of being prompted for secure authentication flows.

Note that when you're redirected back to localhost, you'll land on a page that doesn't exist yet. Let's build that out next!

We need to serve this page, so we setup a super simple route on the server:

```js
app.get("/success", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.sendFile(path);
});
```

We add a new file `client/success.html` with some simple HTML to show the success page and thank the customer. The body is just a header and pre tag:

```html
<h1>Thank you</h1>
<pre class="json" id="session-data"></pre>
```

When we configured the Checkout Session, we used the `{CHECKOUT_SESSION_URL}`. Remember this parameter from earlier?

```js
    success_url: 'http://localhost:4242/success?id={CHECKOUT_SESSION_ID}',
```

The `{CHECKOUT_SESSION_ID}` template variable will be replaced by the ID of the Checkout Session before redirecting back to your success URL. We can use that ID on the success page to retrieve the Checkout Session and display that to the customer.

With this inline `script` tag, we'll first extract the ID from the query string params:

```html
<script charset="utf-8">
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
</script>
```

Since `id` contains the string ID of the Checkout Session, we can pass this attribute to the server with another AJAX call:

```html
<script charset="utf-8">
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");

  fetch("/checkout-session?id=" + id)
    .then((response) => response.json())
    .then((session) => {
      // update our pre tag.
    })
    .catch((error) => {
      console.error("Error:", error);
    });
</script>
```

When the request to the server resolves, we'll just dump the JSON into that `pre` tag so you can see what's available to display and you can build your own success page.

```html
<script charset="utf-8">
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");

  fetch("/checkout-session?id=" + id)
    .then((response) => response.json())
    .then((session) => {
      var sessionData = document.getElementById("session-data"); // grab ref to the pre tag!
      sessionData.innerText = JSON.stringify(session, null, 2);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
</script>
```

This success page is now making a request to our server to `/checkout-session` but we haven't implemented that yet.

On the server, let's add this simple route to start:

```js
app.get("/checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id);
  res.json(session);
});
```

This route will make an API call to [retrieve the Checkout Session](https://stripe.com/docs/api/checkout/sessions/retrieve) from Stripe.

Simply refreshing the success URL from a previous complete payment flow should now show the basic Checkout Session data in the pre tag.

Note that by default, the `line_items` for the Checkout Session are not included in the retrieve response. In order to display information about the `line_items`, you'll want to use the [expand](https://stripe.com/docs/expand) feature.

By tweaking the retrieve call to include expand, the response will now have a new `line_items` property with the content of the `line_items` purchased.

```js
app.get("/checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id, {
    expand: ["line_items"],
  });
  res.json(session);
});
```

Try refreshing the page now and there is the new `line_items` property!

## Implementing recurring payments with Stripe Billing [🎬](https://youtu.be/UjcSWxPNo18?t=1571)

At this point, you have a very basic proof of concept for accepting one-time payments. Let's now upgrade to accept some recurring payments.

The first thing we need to do is to create a new Price. Recall that Prices can either be one-time or recurring. We'll first create a new Product that represents our recurring service. You can create these products using the dashboard or the CLI.

### Creating a product [🎬](https://youtu.be/UjcSWxPNo18?t=1587)

For the dashboard, here are steps to create products: https://support.stripe.com/questions/how-to-create-products-and-prices

For the Stripe CLI, enter the following command:

```sh
stripe products create --name demo-plan
```

which then returns the following response:

```json
{
  "id": "prod_HzZwd49TuS5j1s",
  "object": "product",
  "active": true,
  "attributes": [],
  "created": 1599686699,
  "description": null,
  "images": [],
  "livemode": false,
  "metadata": {},
  "name": "demo-plan",
  "statement_descriptor": null,
  "type": "service",
  "unit_label": null,
  "updated": 1599686699
}
```

### Creating the product's price [🎬](https://youtu.be/UjcSWxPNo18?t=1608)

Now that we have a new Product (`prod_HzZwd49TuS5j1s`), we will create the related recurring Price:

```sh
stripe prices create \
  --unit-amount 3999 \
  --currency USD \
  --product prod_HzZwd49TuS5j1s \
  -d "recurring[interval]=month"
```

(Note the new argument is `recurring[interval]`)

This command returns the following response:

```json
{
  "id": "price_1HPaoKKoPpUdiYpLgVdf3SMC",
  "object": "price",
  "active": true,
  "billing_scheme": "per_unit",
  "created": 1599686796,
  "currency": "usd",
  "livemode": false,
  "lookup_key": null,
  "metadata": {},
  "nickname": null,
  "product": "prod_HzZwd49TuS5j1s",
  "recurring": {
    "aggregate_usage": null,
    "interval": "month",
    "interval_count": 1,
    "trial_period_days": null,
    "usage_type": "licensed"
  },
  "tiers_mode": null,
  "transform_quantity": null,
  "type": "recurring",
  "unit_amount": 3999,
  "unit_amount_decimal": "3999"
}
```

### Updating the Checkout session details [🎬](https://youtu.be/UjcSWxPNo18?t=1648)

The Checkout Session `create` call needs to be updated now to use this new Price (`price_1HPaoKKoPpUdiYpLgVdf3SMC`) and switch the `mode` to `subscription`:

```js
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:4242/success?id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:4242/cancel",
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "price_1HPaoKKoPpUdiYpLgVdf3SMC",
        quantity: req.body.quantity || 1,
      },
    ],
  });
  res.json({
    id: session.id,
  });
});
```

Note the code snippet above, the quantity represents the number of "seats" for the Subscription. Walking back through the payment flow in the browser, you'll notice the changes to the Checkout page now reflect the fact that this price is recurring. Now the customer will be charged this amount on a monthly basis.

## Tax Rates [🎬](https://youtu.be/UjcSWxPNo18?t=1751)

One of the most requested features is support for Taxes. To enable taxes in Checkout, we first need to create a [TaxRate](https://stripe.com/docs/api/tax_rates) object.

When applying tax rates, Stripe calculates the total tax amount per tax rate, summarizing it in a table of the collected tax rates and amounts, and ultimately, into exported tax summary reports.

Let’s create a tax rate with the Stripe CLI:

```sh
stripe tax_rates create \
  --display-name "Sales Tax" \
  --jurisdiction "CA - SF" \
  --percentage 8.5 \
  --inclusive false
```

Setting that command will log the following response:

```json
{
  "id": "txr_1HPatkKoPpUdiYpL8uUhRaMo",
  "object": "tax_rate",
  "active": true,
  "created": 1599687132,
  "description": null,
  "display_name": "Sales Tax",
  "inclusive": false,
  "jurisdiction": "CA - SF",
  "livemode": false,
  "metadata": {},
  "percentage": 8.5
}
```

In addition, setting `inclusive` to false means the tax amount not already included in the overall amount.

### Passing the tax rate for line items [🎬](https://youtu.be/UjcSWxPNo18?t=1805)

Now we can take this TaxRate ID (`txr_1HPatkKoPpUdiYpL8uUhRaMo`) and pass that in the `tax_rates` field for the `line_item` when configuring the Checkout Session:

```js
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:4242/success?id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:4242/cancel",
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "price_1HPaoKKoPpUdiYpLgVdf3SMC",
        quantity: req.body.quantity || 1,
        tax_rates: ["txr_1HPatkKoPpUdiYpL8uUhRaMo"],
      },
    ],
  });
  res.json({
    id: session.id,
  });
});
```

This will apply the 8.5% tax rate to recurring payments.

### Understanding dynamic tax rates [🎬](https://youtu.be/UjcSWxPNo18?t=1864)

The next feature we’ll look at is called dynamic tax rates.

> 🗝 Dynamic tax rates are currently in beta. For access, please reach out if you’d like to participate in the beta: checkout-beta-taxes@stripe.com

- Fixed tax rates + Checkout will use whatever tax rate that is passed in as the rate and apply to the Session.
- With dynamic tax rates, the tax rate is selected based on the address entered by the customer.

The full docs for dynamic tax rates is here: https://stripe.com/docs/billing/subscriptions/taxes#dynamic-configuration

In order for dynamic tax rates to work, they require two extra parameters when creating the tax rate: `country` and `state`. Note that these params are also in beta. Let’s create two new tax rates, one each for San Francisco and New York City:

```sh
stripe tax_rates create \
  --display-name "Sales Tax" \
  --jurisdiction "CA - SF" \
  --percentage 8.5 \
  --inclusive false \
  -d "country=US" \
  -d "state=CA"
```

which logs the following:

```json
{
  "id": "txr_1HPb0eCZ6qsJgndJjdNNq76X",
  "object": "tax_rate",
  "active": true,
  "country": "US",
  "created": 1599687560,
  "description": null,
  "display_name": "Sales Tax",
  "inclusive": false,
  "jurisdiction": "CA - SF",
  "livemode": false,
  "metadata": {},
  "percentage": 8.5,
  "state": "CA"
}
```

Here's an example of setting the tax rates for New York City:

```sh
stripe tax_rates create \
  --display-name "Sales Tax" \
  --jurisdiction "NY - NYC" \
  --percentage 8.875 \
  --inclusive false \
  -d "country=US" \
  -d "state=NY"
```

which will log the following:

```json
{
  "id": "txr_1HPb1MCZ6qsJgndJ0pMZIa8g",
  "object": "tax_rate",
  "active": true,
  "country": "US",
  "created": 1599687604,
  "description": null,
  "display_name": "Sales Tax",
  "inclusive": false,
  "jurisdiction": "NY - NYC",
  "livemode": false,
  "metadata": {},
  "percentage": 8.875,
  "state": "NY"
}
```

For dynamic tax rates, we’ll pass these in the new `dynamic_tax_rates` field.

```js
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:4242/success?id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:4242/cancel",
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "price_1HPaoKKoPpUdiYpLgVdf3SMC",
        quantity: req.body.quantity || 1,
        dynamic_tax_rates: [
          "txr_1HPb0eCZ6qsJgndJjdNNq76X", // CA
          "txr_1HPb1MCZ6qsJgndJ0pMZIa8g", // NY
        ],
      },
    ],
  });
  res.json({
    id: session.id,
  });
});
```

### Restart the server for dynamic tax rates [🎬](https://youtu.be/UjcSWxPNo18?t=1952)

Restart the server and run through the payment flow to see the new dynamic tax rates are derived based on the address of the customer.

Stay tuned to [@StripeDev](https://twitter.com/stripedev) on Twitter for an announcement when dynamic tax rates are generally available.

## Discounts in Stripe Checkout [🎬](https://youtu.be/UjcSWxPNo18?t=2014)

- [Coupons](https://stripe.com/docs/api/coupons) are merchant-facing objects you can use to control discounts on subscriptions or invoices.
- [PromotionCodes](https://stripe.com/docs/api/promotion_codes) are customer-facing codes that are created on top of coupons and can be shared directly with your customers.

First, we [create a coupon](https://stripe.com/docs/api/coupons/create) to define how much to discount as a percent off or a flat amount off of the original price. They can be applied per-customer or per-subscription.

We can create a coupon from the CLI with the following:

```sh
stripe coupons create --percent-off 20 --duration once
```

which will log the following:

```json
{
  "id": "LXu8C4Uk",
  "object": "coupon",
  "amount_off": null,
  "created": 1599687820,
  "currency": null,
  "duration": "once",
  "duration_in_months": null,
  "livemode": false,
  "max_redemptions": null,
  "metadata": {},
  "name": null,
  "percent_off": 20.0,
  "redeem_by": null,
  "times_redeemed": 0,
  "valid": true
}
```

It’s possible to apply a coupon directly to a Subscription with the `coupon` parameter in the [`subscription_data`](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-subscription_data-coupon) hash. You might do this if you know the coupon to apply for a specific Checkout Session ahead of time.

### Entering coupon codes on the frontend [🎬](https://youtu.be/UjcSWxPNo18?t=2118)

If you want to allow customers to enter their own codes, we need to [create a PromotionCode](https://stripe.com/docs/api/promotion_codes/create) from a coupon. From the CLI, we can create a new PromotionCode from the coupon we just created:

```sh
stripe promotion_codes create \
  --coupon LXu8C4Uk \
  --code FRIENDS20 \
  --api-key sk_test_xxx
```

To enable customers to enter their own PromotionCodes at Checkout, we need to pass the `allow_promotion_codes` parameter with the value `true` in our Checkout Session configuration.

```js
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:4242/success?id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:4242/cancel",
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "price_1HPaoKKoPpUdiYpLgVdf3SMC",
        quantity: req.body.quantity || 1,
      },
    ],

    // enables customers to enter promotion code IDs at Checkout.
    allow_promotion_codes: true,
  });
  res.json({
    id: session.id,
  });
});
```

Now we can use the code `FRIENDS20` at Checkout to get the 20% off discount. Restart your server and try that out.

## Wrap up and additional question?

If you would like to engage with us, follow us on Twitter [@StripeDev](https://twitter.com/stripedev) for updates and announcements about upcoming Stripe Developer Office Hours.
