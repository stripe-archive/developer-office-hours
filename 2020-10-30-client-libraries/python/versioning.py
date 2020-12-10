import stripe

# Set with a valid test API key.
stripe.api_key = 'sk_test_XXX'

# Create customer without an API version set, this will use the account's default version.
customer = stripe.Customer.create(
  email='jenny.rosen@example.com',
  description='customer created using default account API version'
)
print('Customer created wtihout setting an API version:')
print(customer)

# Set the API version globally for all requests.
stripe.api_version = '2020-08-27'

# Create a customer using the global API version
customer = stripe.Customer.create(
  email='jenny.rosen@example.com',
  description='customer created with global API version set'
)
print('Customer created wtih global API version:')
print(customer)

# set the api version to an older version so we can see the request header working
stripe.api_version = '2019-11-05'
# Create a customer and set the API version on the request
customer = stripe.Customer.create(
  email='jenny.rosen@example.com',
  description='customer created with API version set on request',
  stripe_version='2020-08-27')  
print('Customer created with API version set on the request:')
print(customer)

# Retrieve the customer.created event or look at it in the Dashboard: https://dashboard.stripe.com/test/events 
# In this case example we're making the assumption the last event was the one we wanted. 
# The customer object in the event payload will be based off of the API version your
# account is set to. 
#Be sure to watch the pagination video to learn more about listing objects :)    
events = stripe.Event.list(limit=1)
print('customer created event')
print(events.data[0])

# Create a webhook endpoint and set its API version.
endpoint = stripe.WebhookEndpoint.create(
  api_version='2020-08-27',
  url='https://example.com/my/webhook/endpoint',
  enabled_events=[
    'customer.created'
  ]
)

# Create a new customer to see an event sent to the endpoint. 
customer = stripe.Customer.create(
  email='jenny.rosen@example.com',
  description='customer created to see webhook event'
)

# Visit the Dashboard page for the endpoint you just created:
# https://dashboard.stripe.com/test/webhooks/we_XXX  
# Under "Webhook Attempts" you'll see the event data Stripe has sent to the endpoint 
# for the customer that was just created. 
# Since we created the endpoint using the  2020-08-27 API version, the customer object 
# in the payload is using that version and not the version used to create the customer. 
print('All done, visit https://dashboard.stripe.com/test/webhooks to see what was sent to the endpoint')
