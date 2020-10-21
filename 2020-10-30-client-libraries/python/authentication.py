import stripe

# Set globally

# stripe.api_key = "sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H"

# Per request
# print(stripe.Customer.retrieve('cus_ICiIH7WIPI4Gr1', api_key='sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H'))

# With connect
account_id = 'acct_1Ey3h1BqeQ4DKpna'

# Per request
# print(stripe.Customer.list(stripe_account=account_id, api_key='sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H'))

# Set platform API key globally
stripe.api_key = "sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H"
print(stripe.Customer.retrieve('cus_HDfWzCQ6UEVtfu', stripe_account=account_id))
