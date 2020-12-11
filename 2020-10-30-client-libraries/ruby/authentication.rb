require 'stripe'

# Globally set API key:
# Stripe.api_key = 'sk_test...'

# API key set per request:
# customer_id = 'cus_ICiIH7WIPI4Gr1'
# customer = Stripe::Customer.retrieve(customer_id, {api_key: 'sk_test...'})
# p customer

# Authenticating API calls with connect
account_id = 'acct_1Ey3h1BqeQ4DKpna'
customer_id = 'cus_HDfWzCQ6UEVtfu'

# Setting your platform secret API key globally:
# Stripe.api_key = 'sk_test...'
# p Stripe::Customer.retrieve(customer_id, {
#   stripe_account: account_id,
# })

# Or per request:
p Stripe::Customer.retrieve(customer_id, {
  stripe_account: account_id,
  api_key: 'sk_test...'
})
