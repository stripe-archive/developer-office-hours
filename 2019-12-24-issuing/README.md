# Issuing Cards 2019-12-24

Learn how to create credit cards with Stripe Issuing

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=knBWhYMqLds)


# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes.

### Prerequisites
* Ruby 2.4.5
* Postgres
* [Invited to Stripe Issuing](https://stripe.com/issuing)
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)

## Step by Step

1. Download and Install dependencies

```sh
git clone git@github.com:stripe-samples/developer-office-hours.git
cd developer-office-hours/2019-12-24-issuing
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
