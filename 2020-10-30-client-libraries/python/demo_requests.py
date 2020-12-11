import stripe
stripe.api_key = 'sk_test...'

print('Making requests!')

# Create a customer with no params
# customer = stripe.Customer.create()
# print(customer)

# Retrieve a customer
# customer = stripe.Customer.retrieve(
#     'cus_IVPkw3KcFOEz5G'
# )
# # /v1/customers/cus_IVPkw3KcFOEz5G
# print(customer)

# Create a customer with scalar values
# customer = stripe.Customer.create(
#     email='jenny.rosen@example.com',
#     name='Jenny Rosen',
# )
# # email=jenny.rosen@example.com&name=Jenny%20Rosen
# print(customer.name)
# print(customer.email)

# Create customer with enum
# customer = stripe.Customer.create(
#     tax_exempt='reverse'
# )
# print(customer.tax_exempt)

# Create customer with nested dict
# customer = stripe.Customer.create(
#     payment_method='pm_card_visa',
#     invoice_settings={
#         'default_payment_method': 'pm_card_visa',
#     }
# )
# print(customer.invoice_settings)

# Create a customer with list of strings
# customer = stripe.Customer.create(
#     preferred_locales=['en', 'es']
# )
# print(customer)
# print(customer.preferred_locales)

# Update a customer's email address
# customer = stripe.Customer.modify(
#     'cus_IVPutJCp28aWWh',
#     email='jr2@example.com'
# )
# print(customer.id)
# print(customer.email)

# Update customer with nested dict
# customer = stripe.Customer.modify(
#     'cus_IVPutJCp28aWWh',
#     invoice_settings={
#         'custom_fields': [{
#             'name': 'VAT',
#             'value': '123ABC'
#         }]
#     }
# )
# print(customer.invoice_settings)

# Fetch a list of customers
# customers = stripe.Customer.list()
# print(customers)
# print([cus.id for cus in customers.data])

# Filter list of customers by email
# customers = stripe.Customer.list(
#     email='jenny.rosen@example.com'
# )
# print(customers)
# print([cus.id for cus in customers.data])
# print([cus.email for cus in customers.data])

# Delete a customer
# customer = stripe.Customer.delete(
#     'cus_IVPkw3KcFOEz5G',
# )
# print(customer)

# Create a payment intent to confirm
# payment_intent = stripe.PaymentIntent.create(
#     amount=1000,
#     currency='usd'
# )
# print(payment_intent.id)
# print(payment_intent.status)

# Confirm a payment intent
# payment_intent = stripe.PaymentIntent.confirm(
#     'pi_1HuPDJCZ6qsJgndJJOtfVz0X',
#     payment_method='pm_card_visa',
# )
# print(payment_intent.id)
# print(payment_intent.status)

# First, fetch an invoice
# invoice = stripe.Invoice.list(limit=1).data[0]
#
# # Second, fetch lines for invoice through
# # the `lines` nested service method.
# lines = invoice.lines.list(limit=5)
# # /v1/invoices/in_xxx/lines
# print(lines)

# Create a customer on a connected account
customer = stripe.Customer.create(
    email='jenny.rosen@example.com',
    stripe_account='acct_1Ey3h1BqeQ4DKpna'
)
print(customer)
