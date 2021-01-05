
<?php
require_once('vendor/autoload.php');
// Set with a valid test API key.
$stripe = new \Stripe\StripeClient('sk_test_XXX');

echo 'Hello, Metadata!';

// Create a customer with 2 metadata key value pairs
echo $stripe->customers->create([
    'name' => 'Jenny Rosen',
    'metadata' => ['my_app_id' => 123, 'my_app_username' => 'jenny_rosen']
]);

// Add additional metadata to an existing object by making an update call.
// Replace this customer id with the customer you created above.
echo $stripe->customers->update(
    'cus_IZyrJPGIldZGtv',
    ['metadata' => ['favorite_animal' => 'cheetah']
]);

// Update metadata on an existing object by making an update call.
// Only the metadata keys you specify in the call will be updated,
// other keys will remain unchanged.
// Replace this customer id with the customer you created above.
echo $stripe->customers->update(
    'cus_IZyrJPGIldZGtv',
    ['metadata' => ['favorite_animal' => 'llama']
]);

// Remove metadata from an object by making an update call.
// Set the value to the empty string for any metadata you wish to remove from the object.
// Replace this customer id with the customer you created above.
echo $stripe->customers->update(
    'cus_IZyrJPGIldZGtv',
    ['metadata' => [
        'favorite_animal' => '',
        'my_app_username' => ''
    ]
]);

