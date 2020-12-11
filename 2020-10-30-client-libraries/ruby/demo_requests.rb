require 'stripe'
Stripe.api_key = 'sk_test...'

puts "Making requests!"

# Create a customer with no params
# customer = Stripe::Customer.create
# p customer

# Retrieve customer
# customer = Stripe::Customer.retrieve(
#   "cus_IVOWFjzG7w1jh4"
# )
# p customer
#

# Create customer with scalar params
# customer = Stripe::Customer.create(
#   email: 'Jenny.Rosen@example.com',
#   name: 'Jenny Rosen',
# )
# # email=Jenny.Rosen@example.com&name=Jenny%20Rosen
# p customer

# Create customer with enum
# customer = Stripe::Customer.create(
#   tax_exempt: 'exempt'
# )
# p customer

# Create customer with nested hash
# customer = Stripe::Customer.create(
#   payment_method: 'pm_card_visa',
#   invoice_settings: {
#     default_payment_method: 'pm_card_visa',
#   }
# )
# p customer

# Create customer with list of strings
# customer = Stripe::Customer.create(
#   preferred_locales: ['en', 'es']
# )
# p customer
# p customer.preferred_locales

# Update a customer's email address
# customer = Stripe::Customer.update(
#   "cus_IVOWFjzG7w1jh4",
#   email: 'jr2@example.com',
# )
# p customer.id
# p customer.email

# Update with nested hash
# customer = Stripe::Customer.update(
#   "cus_IVOWFjzG7w1jh4",
#   invoice_settings: {
#     custom_fields: [{
#       name: 'VAT',
#       value: '123ABC'
#     }]
#   }
# )
# p customer.invoice_settings

# Fetch a list of customers
# customers = Stripe::Customer.list
# p customers
# puts customers.data.map(&:id)

# Filter list of customers by email
# jenny_rosen_customers = Stripe::Customer.list(
#   email: 'jenny.rosen@example.com'
# )
# # /v1/customers?email=jenny.rosen@example.com
# p jenny_rosen_customers.data.map(&:id)
# p jenny_rosen_customers.data.map(&:email)

# Delete a customer
# customer = Stripe::Customer.delete(
#   "cus_IVOWFjzG7w1jh4"
# )
# p customer

# Create payment intent
# payment_intent = Stripe::PaymentIntent.create(
#   amount: 1000,
#   currency: 'usd',
# )
# p payment_intent.id

# Confirm a payment intent
# payment_intent = Stripe::PaymentIntent.confirm(
#   "pi_1HuORgCZ6qsJgndJxKl4gfnp",
#   payment_method: 'pm_card_visa'
# )
# p payment_intent
# p payment_intent.status
# First Fetch API call to retrieve an invoice
# invoice = Stripe::Invoice.list(limit: 1).data.first
# Second API call to retrieve the list of
# lines from the invoice.
# lines = invoice.lines.list(limit: 5)
# p lines
# Results in a request to path with the ID
# of the parent resource in the path:
#   /v1/invoices/in_xxx/lines

customer = Stripe::Customer.create({
  email: "jenny.rosen@example.com"
}, {
  stripe_account: 'acct_1Ey3h1BqeQ4DKpna'
})
p customer
