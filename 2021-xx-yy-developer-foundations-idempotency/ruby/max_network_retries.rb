require 'stripe'

Stripe.api_key = 'sk_test_'

Stripe.max_network_retries = 2

Stripe::Customer.create({
  email: 'foo@bar.com'
})
