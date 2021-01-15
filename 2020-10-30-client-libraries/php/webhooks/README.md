# Stripe foundations: Webhooks

## Requirements

- PHP >= 7.1.3
- Composer
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## How to run

1. Install dependencies

```
composer require stripe/stripe-php
```

2. Run the application

```
php -S localhost:4242
```

3. Start the webhook forwarding

```bash
stripe listen --forward-to=localhost:4242
```

4. Trigger an event

```bash
stripe trigger customer.created
```
