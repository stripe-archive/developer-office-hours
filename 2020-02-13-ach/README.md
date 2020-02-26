# Bank Account Setup for ACH - Office Hours 2020-02-13

Walk through the basics of collecting and verifying Bank Account details for
ACH with Stripe API and Go lang.

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=_1EX-DrikoA&list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs&index=3&t=0s)

# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes. This is meant to be a guide
to show you how to go about collecting and verifying Bank Accounts for ACH.

### Prerequisites
* Go
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [A Stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)
* [Plaid API Keys](https://dashboard.plaid.com/overview/sandbox)

## Step by step

1. **Configure your keys**

Copy the example `.env` file and update those values with your Stripe and Plaid API keys.

```
cp .env.example .env
```

Then, be sure to update the publishable key (pk_xxx) in client/manual.html.

2. **Start the server**

```sh
go run server.go
```

3. **Run the demo**

Try using the test credentials `user_good` and `pass_good` to login to the bank account
Try using different [test bank account numbers and verification amounts](https://stripe.com/docs/ach#testing-ach).


### More Resources
* [ACH Credit Transfer](https://stripe.com/docs/sources/ach-credit-transfer)
* [Stripe Developers YouTube Channel](https://www.youtube.com/channel/UCd1HAa7hlN5SCQjgCcGnsxw)
* [Stripe YouTube Channel](https://www.youtube.com/channel/UCM1guA1E-RHLO2OyfQPOkEQ)

### Demo

<img src="./demo.gif" width="50%">
