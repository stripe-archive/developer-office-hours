# Use Klarna to Pay in installments

Learn how to integrate the [Klarna](https://stripe.com/docs/sources/klarna) and allow customers to pay in installments.

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=tIEAs93ZW2Y&list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs&index=10&t=0s)


# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes.

### Prerequisites
* Ruby
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)

## Step by Step

1. Download and Install dependencies

```sh
git clone git@github.com:stripe-samples/developer-office-hours.git
cd developer-office-hours/2020-04-15-klarna-pay-installments
bundle install
```

2. Update API keys

Add your [Stripe API keys](https://dashboard.stripe.com/test/apikeys) to the .env file.


3. Start the server

```sh
ruby server.rb
```

5. Browse to `http://localhost:4242`
