require 'stripe'
# Set with a valid test API key.
Stripe.api_key = 'sk_test_XXX'

puts 'Hello metadata!'

# Create a customer with 2 metadata key value pairs
p Stripe::Customer.create(
    name: 'Jenny Rosen',
    metadata: {
        my_app_id: 123,
        my_app_username: 'jenny_rosen'
    }
)

# Add additional metadata to an existing object by making an update call.
# Replace this customer id with the customer you created above.
p Stripe::Customer.update(
    'cus_IZw6Y91ytq5xoJ',
    metadata: {
       favorite_animal: 'cheetah'
    }
)

# Update metadata on an existing object by making an update call.
# Only the metadata keys you specify in the call will be updated,
# other keys will remain unchanged.
# Replace this customer id with the customer you created above.
p Stripe::Customer.update(
    'cus_IZw6Y91ytq5xoJ',
    metadata: {
        favorite_animal: 'llama'
    }
)

# Remove metadata from an object by making an update call.
# Set the value to the empty string for any metadata you wish to remove from the object.
# Replace this customer id with the customer you created above.
p Stripe::Customer.update(
    'cus_IZw6Y91ytq5xoJ',
    metadata: {
        favorite_animal: '',
        my_app_username: ''
    }
)
