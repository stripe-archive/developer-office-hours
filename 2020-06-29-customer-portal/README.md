# Stripe Customer Portal

Learn how to integrate the [Customer Portal](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal) and allow customers to manage their billing directly on Stripe.

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=u8H6awDJVpM)


# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes.

### Prerequisites
* Ruby 2.6.3
* Postgres
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)

## Step by Step

1. Download and Install dependencies

```sh
git clone git@github.com:stripe-samples/developer-office-hours.git
cd developer-office-hours/2020-06-29-customer-portal
bundle install
```

2. Update API keys

```sh
EDITOR=vi rails credentials:edit
```

Add your [Stripe API keys](https://dashboard.stripe.com/test/apikeys) to the
Rails credentials.

```yml
stripe:
  secret_key: sk_your_secret_key
```

3. Setup Database

```sh
rake db:create db:migrate
```

4. Start rails server

```sh
rails server
```

5. Browse to `http://localhost:3000`
