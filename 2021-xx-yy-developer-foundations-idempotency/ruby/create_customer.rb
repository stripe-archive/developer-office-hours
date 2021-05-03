require 'stripe'

Stripe.api_key = 'sk_test_xxx'

Stripe::Customer.create({
  email: 'foo@bar.com'
}, {idempotency_key: 'a-long-random-string-20210115164014'})
