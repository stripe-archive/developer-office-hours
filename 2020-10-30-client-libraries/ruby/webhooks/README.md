# Stripe foundations: Webhooks

A [Sinatra](http://sinatrarb.com/) server example for handling Stripe webhooks.

## Requirements

- Ruby v2.4.5+
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## How to run

1. Install dependencies

```
bundle install
```

2. Run the application

```
ruby server.rb
```

3. Start the webhook forwarding

```bash
stripe listen --forward-to=localhost:4242/webhook
```

4. Trigger an event

```bash
stripe trigger customer.created
```
