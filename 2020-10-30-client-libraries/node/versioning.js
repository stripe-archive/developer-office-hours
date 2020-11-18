// Set with a valid test API key.
const stripe = require('stripe')('sk_test_XXX');

// Create customer without an API version set, this will use the account's default version.
(async () => {
  
  let customer = await stripe.customers.create({
    email: 'jenny.rosen@example.com',
    description: 'customer created using default account API version'
  });
  console.log('Customer created wtihout setting an API version:');
  console.log(customer);

  // Set the API version globally for all requests.
  // Set with a valid test API key.
  const stripeWithGlobalAPIVersionSet = require('stripe')('sk_test_XXX', {
    apiVersion: '2020-08-27',
  });

  customer = await stripeWithGlobalAPIVersionSet.customers.create({
    email: 'jenny.rosen@example.com',
    description: 'customer created global API version set'
  });
  console.log('Customer created with global API version:');
  console.log(customer);


  // Set API version per request.
  customer = await stripe.customers.create({
    email: 'jenny.rosen@example.com',
    description: 'customer created with API version set on request'
    }, {
      apiVersion: '2020-08-27'
    });
  console.log('Customer created with API version set on the request:');
  console.log(customer);

  // Retrieve the customer.created event or look at it in the Dashboard: https://dashboard.stripe.com/test/events 
  // In this case example we're making the assumption the last event was the one we wanted. 
  // The customer object in the event payload will be based off of the API version your
  // account is set to. 
  // Be sure to watch the pagination video to learn more about listing objects :)     
  const events = await stripe.events.list({
    limit: 1,
  });
  console.log('customer object from the customer created event:')
  console.log(events.data[0].data.object);


  // Create a webhook endpoint and set its API version.
  const webhookEndpoint = await stripe.webhookEndpoints.create({
    api_version: '2020-08-27', 
    url: 'https://example.com/my/webhook/endpoint',
    enabled_events: [
      'customer.created'
    ],
  });


  // Create a new customer to see an event sent to the endpoint. 
  customer = await stripe.customers.create({
    email: 'jenny.rosen@example.com',
    description: 'customer created to see webhook event'
  });

  // Visit the Dashboard page for the endpoint you just created:
  // https://dashboard.stripe.com/test/webhooks/we_XXX  
  // Under "Webhook Attempts" you'll see the event data Stripe has sent to the endpoint 
  // for the customer that was just created. 
  // Since we created the endpoint using the  2020-08-27 API version, the customer object 
  // in the payload is using that version and not the version used to create the customer. 
  console.log('All done, visit https://dashboard.stripe.com/test/webhooks to see what was sent to the endpoint');
})()