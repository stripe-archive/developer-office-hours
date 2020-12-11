import stripe

# Set globally

# stripe.api_key = "sk_test..."

# Per request
# print(stripe.Customer.retrieve('cus_ICiIH7WIPI4Gr1', api_key='sk_test...'))

# With connect
account_id = 'acct_1Ey3h1BqeQ4DKpna'

# Per request
# print(stripe.Customer.list(stripe_account=account_id, api_key='sk_test...'))

# Set platform API key globally
stripe.api_key = "sk_test..."
print(stripe.Customer.retrieve('cus_HDfWzCQ6UEVtfu', stripe_account=account_id))
