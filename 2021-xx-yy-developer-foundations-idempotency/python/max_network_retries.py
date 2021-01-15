import stripe

stripe.api_key = "sk_test_xxx"

stripe.max_network_retries = 2

stripe.Customer.create(
  email="foo@bar.com",
)
