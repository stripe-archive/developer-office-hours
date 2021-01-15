# Stripe foundations: Webhooks

An [Express server](http://expressjs.com) server example for handling Stripe webhooks.

## Requirements

- Node v10+
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## How to run

1. Install dependencies

```
npm install
```

2. Run the application

```bash
npm start
```

3. Start the webhook forwarding

```bash
stripe listen --forward-to=localhost:4242/webhook
```

4. Trigger an event

```bash
stripe trigger customer.created
```
