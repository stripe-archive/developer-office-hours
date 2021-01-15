# Stripe foundations: Webhooks

## Requirements

- Maven
- Java
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

1. Build the package

```
mvn package
```

2. Run the application

```
java -cp target/stripe-webhooks-1.0.0-SNAPSHOT-jar-with-dependencies.jar com.stripe.sample.Server
```

3. Start the webhook forwarding

```bash
stripe listen --forward-to=localhost:4242/webhook
```

4. Trigger an event

```bash
stripe trigger customer.created
```
