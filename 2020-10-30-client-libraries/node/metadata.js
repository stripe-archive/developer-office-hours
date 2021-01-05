// Set with a valid test API key.
const stripe = require ('stripe')('sk_test_XXX');

(async () => {
    console.log('hello, metadata');

    //Create a customer with 2 metadata key value pairs
    const customer = await stripe.customers.create({
        name: 'Jenny Rosen',
        metadata: {
          my_app_id: 123,
          my_app_username: 'jenny_rosen'
        }
    });
    
    // Add additional metadata to an existing object by making an update call.
    // Replace this customer id with the customer you created above.
    const customer = await stripe.customers.update(
        'cus_IZz12b4owpDi1s',
        { metadata: {'favorite_animal': 'cheetah'}}
    );

    // Update metadata on an existing object by making an update call.
    // Only the metadata keys you specify in the call will be updated,
    // other keys will remain unchanged.
    // Replace this customer id with the customer you created above.
    const customer = await stripe.customers.update(
        'cus_IZz12b4owpDi1s',
        { metadata: {'favorite_animal': 'llama'}}
    );

    // Remove metadata from an object by making an update call.
    // Set the value to the empty string for any metadata you wish to remove from the object.
    // Replace this customer id with the customer you created above.
    const customer = await stripe.customers.update(
        'cus_IZz12b4owpDi1s',
        { metadata: {'my_app_username': '', 
          'favorite_animal': ''
        }
    });

    console.log(customer);
})();

