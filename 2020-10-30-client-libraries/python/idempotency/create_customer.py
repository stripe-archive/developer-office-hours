# For more information about this demo, please see:
#   https://www.youtube.com/watch?v=94RgPhqBLfU
import stripe

stripe.api_key = "sk_test_xxx"

stripe.Customer.create(
  email="foo@bar.com",
  idempotency_key='a-long-random-string-20210115164236'
)
