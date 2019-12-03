# One-time Payments on iOS 2019-12-04

Learn how to collect one-time Payments using Stripe's iOS SDK

> Join us on [YouTube https://www.youtube.com/watch?v=s5Ml41bZidw&list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs&index=4&t=0s](https://www.youtube.com/watch?v=s5Ml41bZidw&list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs&index=4&t=0s)


# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes. This is meant to be a guide
to show you how to go about building an example iOS app with a payment flow for one time
payments.


### Prerequisites
* Swift
* [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
* [Cocoapods](https://cocoapods.org/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)
* [Stripe example iOS backend](https://github.com/stripe/example-ios-backend#example-app-backend)

## Step by step

1. **Install Pods**

From the directory where the Podfile is, install the Stripe iOS SDK and Alamofire pods with
```
pod install
```

2. **Start the server**

Deploy the example iOS backend to Heroku: https://github.com/stripe/example-ios-backend#example-app-backend

3. **Configure your keys in your project**

After opening the project in Xcode, set your Stripe publishable key and Heroku backend URL in Constants.swift
```
    static let herokuBackendUrl : String = "https://yourserverurl.herokuapp.com/"
    static let stripePublishableKey : String = "pk_test_123"
```

4. **Run the demo**

Run the project in Xcode on a simulator.
Enter a test card token (e.g. 4242) and press "Submit Payment" button

For test cards see [https://stripe.com/docs/testing#cards](https://stripe.com/docs/testing#cards).

### More Resources
* [Stripe iOS SDK](https://github.com/stripe/stripe-ios)
* [iOS SDK reference](https://stripe.dev/stripe-ios/docs/index.html)
* [One time payments guide in iOS](https://stripe.com/docs/payments/accept-a-payment#ios)
* [Stripe Developers YouTube Channel](https://www.youtube.com/channel/UCd1HAa7hlN5SCQjgCcGnsxw)
* [Stripe YouTube Channel](https://www.youtube.com/channel/UCM1guA1E-RHLO2OyfQPOkEQ)

### Demo

<img src="./demo.gif" width="40%">