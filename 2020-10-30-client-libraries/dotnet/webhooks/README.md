# Stripe foundations: Webhooks

A .NET example for handling Stripe webhooks.

## Requirements

- [.NET Core](https://dotnet.microsoft.com/download)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## How to run

1. Run the application

```
dotnet run
```

2. Start the webhook forwarding

```bash
stripe listen --forward-to=localhost:4242/webhook
```

3. Trigger an event

```bash
stripe trigger customer.created
```
