import stripe

# Set with a valid test API key.
stripe.api_key = 'sk_test_XXX'

print('Hello metadata!')

# Create a customer with 2 metadata key value pairs
customer = stripe.Customer.create(
  name='Jenny Rosen',
  metadata={'my_app_id':123, 'my_app_username': 'jenny_rosen'}
)
print(customer)

# Add additional metadata to an existing object by making an update call.
# Replace this customer id with the customer you created above.
customer = stripe.Customer.modify(
    'cus_IZwTczojjEBmFw',
    metadata={'favorite_animal':'llama'}
)
print (customer)

# Update metadata on an existing object by making an update call.
# Only the metadata keys you specify in the call will be updated,
# other keys will remain unchanged.
# Replace this customer id with the customer you created above.
customer = stripe.Customer.modify(
    'cus_IZwTczojjEBmFw',
    metadata={'favorite_animal':'cheetah'}
)
print (customer)

# Remove metadata from an object by making an update call.
# Set the value to the empty string for any metadata you wish to remove from the object.
# Replace this customer id with the customer you created above.
customer = stripe.Customer.modify(
    'cus_IZwTczojjEBmFw',
    metadata={'favorite_animal':'', 'my_app_username': ''}
)
print (customer)