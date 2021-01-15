# Stripe foundations: Webhooks

A [Go](https://golang.org) example for handling Stripe webhooks.

## Requirements

- Go
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## How to run

1. Run the application

```
go run server.go
```

2. Start the webhook forwarding

```bash
stripe listen --forward-to=localhost:4242/webhook
```

3. Trigger an event

```bash
stripe trigger customer.created
```
