# Stripe Checkout 2019-11-21

Learn how to collect one-time Payments and setup Subscriptions with Stripe
Checkout.

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=VQ5jccnZ2Ow&list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs&index=2&t=0s)

# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes. This is meant to be a guide
to show you how to go about building a Stripe Checkout payment flow for one time
and recurring payments.


### Prerequisites
* PHP
* [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)

## Step by step

1. **Configure your keys**

Copy the example `.env` file and update those values with your Stripe API keys.

```
cp .env.example .env
```

Then, be sure to update the publishable key (pk_xxx) in client/index.html

2. **Start the server**

```sh
cd server/php
composer install
composer start
```

3. **Run the demo**

For test cards see [https://stripe.com/docs/testing#cards](https://stripe.com/docs/testing#cards).

*Step 1: Saving card details*

Browse to [http://localhost:4242](http://localhost:4242) and click "Buy"

*Step 2: Complete Checkout and view payment status

### More Resources
* [Checkout](https://stripe.com/docs/checkout)
* [SCA Overview](https://stripe.com/docs/strong-customer-authentication)
* [Stripe Developers YouTube Channel](https://www.youtube.com/channel/UCd1HAa7hlN5SCQjgCcGnsxw)
* [Stripe YouTube Channel](https://www.youtube.com/channel/UCM1guA1E-RHLO2OyfQPOkEQ)

### Demo

<img src="./demo.gif" width="50%">
