# Developer Office Hours Starter

This is a mostly empty sample that provides a common starting point when
following along with [Developer Office Hours](https://www.youtube.com/playlist?list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs).

Features:

- Pre-configured Webhook Handler  😃
- .env management 🏋️
- A basic starting html template 💡

## How to run locally

This sample includes 5 server implementations in Node, Ruby, Python, Java, and PHP.

Follow the steps below to run locally.

**1. Clone and configure the sample**

The Stripe CLI is the fastest way to clone and configure a sample to run locally.

**Using the Stripe CLI**

If you haven't already installed the CLI, follow the [installation
steps](https://github.com/stripe/stripe-cli#installation) in the project
README. The CLI is useful for cloning samples and locally testing webhooks and
Stripe integrations.

In your terminal shell, run the Stripe CLI command to clone the sample:

```
stripe samples create office-hours
```

The CLI will walk you through picking your integration type, server and client
languages, and configuring your .env config file with your Stripe API keys.

**Installing and cloning manually**

If you do not want to use the Stripe CLI, you can manually clone and configure
the sample yourself:

```
git clone https://github.com/stripe-samples/developer-office-hours
```

Copy the .env.example file into a file named .env in the folder of the server
you want to use. For example:

```
cp .env.example server/node/.env
```

You will need a Stripe account in order to run the demo. Once you set up your
account, go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys.

```
STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

`STATIC_DIR` tells the server where to the client files are located and does
not need to be modified unless you move the server files.

**2. Follow the server instructions on how to run:**

Pick the server language you want and follow the instructions in the server
folder README on how to run.

For example, if you want to run the Node server:

```
cd server/node # there's a README in this folder with instructions
npm install
npm start
```

**3. [Optional] Run a webhook locally:**

If you want to test the webhooks piece of your integration integration with a
local webhook on your machine, you can use the Stripe CLI to easily spin one
up.

Make sure to [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#link-account).

```
stripe listen --forward-to localhost:4242/webhook
```

The CLI will print a webhook secret key to the console. Set
`STRIPE_WEBHOOK_SECRET` to this value in your .env file.

You should see events logged in the console where the CLI is running.

When you are ready to create a live webhook endpoint, follow our guide in the
docs on [configuring a webhook endpoint in the dashboard](https://stripe.com/docs/webhooks/setup#configure-webhook-settings).

When the app is running, use `4242424242424242` as a test card number with any
CVC code + a future expiration date.

Use the `4000002500003155` test card number to trigger an SCA flow.

Read more about testing on Stripe at https://stripe.com/docs/testing.

## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Stripe calls and
concepts you need to understand. These demos are meant as an educational tool
that helps you roadmap how to integrate Stripe within your own system
independent of the framework.

Q: Can you show me how to build X?

A: We are always looking for new sample ideas, please email
dev-samples@stripe.com with your suggestion!
