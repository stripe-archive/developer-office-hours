# Office Hours 2019-10-16 - Webhooks

Evolve a basic webhook handler from the most primitave to one that follows some
recommended best practices for handling Stripe webhooks.

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=oYSLhriIZaA&feature=youtu.be)

# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes. This is meant to be a guide
to show you how to go about evolving a webhook handling system.

### Prerequisites
* Ruby 2.4.5
* Postgres
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)

## Step by Step

1. Download and Install dependencies

```sh
git clone git@github.com:stripe-samples/developer-office-hours.git
cd developer-office-hours/2019-10-16-webhooks
bundle install
```

2. Login and start stripe-cli listener

Note: Copy the `whsec_xxx` key from the output of the listen command.

```sh
stripe login
stripe listen --forward-to localhost:3000/webhook_events/stripe
```

3. Update API keys

```sh
EDITOR=vi rails credentials:edit
```

Add your [Stripe API keys](https://dashboard.stripe.com/test/apikeys) to the
Rails credentials.

```yml
stripe:
  pk: pk_your_publishable_key
  sk: sk_your_secret_key
  wh: whsec_your_webhook_signing_secret
```

4. Update publishable key and SKU for testing in /public/index.html

Create a new product and enable Checkout in your Stripe Dashboard.

5. Setup Database

```sh
rake db:create db:migrate
```

6. Start rails server

```sh
rails server
```

7. Browse to `http://localhost:3000`
