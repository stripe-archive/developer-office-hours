# Office Hours 2019-09-04
Walk through the basics of building a simple one-time SCA compliant payment flow
with the Stripe API and PHP following [this guide](https://stripe.com/docs/payments/payment-intents/quickstart#automatic-confirmation-flow).
> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=ltv44zkpgo0&list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs)

# Getting Started
Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes. This is meant to be a guide
to show you how to go about building an SCA ready one-time payment flow.

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

Then, be sure to update the publishable key (pk_xxx) in client/index.html.

2. **Start the server**

```sh
cd server/php
composer install
composer start
```

3. **Listen for webhooks (in another tab)**

```sh
stripe listen --forward-to http://localhost:4242/webhooks
```

4. **Run the demo**

Open [http://localhost:4242](http://localhost:4242)

### More Resources
* [SCA Overview](https://stripe.com/docs/strong-customer-authentication)
* [Stripe Developers YouTube Channel](https://www.youtube.com/channel/UCd1HAa7hlN5SCQjgCcGnsxw)
* [Stripe YouTube Channel](https://www.youtube.com/channel/UCM1guA1E-RHLO2OyfQPOkEQ)

<img src="./demo.gif" width="50%">
