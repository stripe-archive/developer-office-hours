![Developer Office Hours](./assets/developer-office-hours.png)

# Stripe Developer Office Hours - Accept a payment

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=2PJTcShgBps)

## Requirements
* Ruby
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a Stripe account](https://dashboard.stripe.com/register)
* [API keys for your account](https://stripe.com/docs/keys)

## How to run

This project uses [Sinatra](http://sinatrarb.com/) as its server. Here's how to run it after cloning.

1. Create and populate a `.env` file. There's a starter example you can copy in `server/`.

```
cp server/.env.example server/.env
# Then open server/.env in your text editor and paste in the API keys for your account and a Price ID.
```

2. Install dependencies and start up the server.

```
cd server/
bundle install
ruby server
```

3. Go in your browser `http://localhost:4242` to see the demo

## More resources
* [The Sinatra Starter episode](https://www.youtube.com/watch?v=8aA9Enb8NVc)
* [Official Accept a payment guide](https://stripe.com/docs/payments/accept-a-payment)
