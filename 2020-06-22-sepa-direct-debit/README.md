# SEPA Direct Debit - Office Hours 2020-06-22

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=tUQoKit6XTM&lc=UgzmPFxM7-bl6kDoSgN4AaABAg)

## Requirements
* Ruby
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a Stripe account](https://dashboard.stripe.com/register)
* [API keys for your account](https://stripe.com/docs/keys)

## How to run

This project uses [Sinatra](http://sinatrarb.com/) as its server. Here's how to run it after cloning.

1. Create and populate a `.env` file. There's a starter example you can copy in `server/`.

```
cp server/example.env server/.env
# Then open server/.env in your text editor and paste in the API keys for your account.
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
* [Official SEPA Direct Debit Docs](https://stripe.com/docs/payments/sepa-debit)

![Developer Office Hours](./assets/developer-office-hours.png)
