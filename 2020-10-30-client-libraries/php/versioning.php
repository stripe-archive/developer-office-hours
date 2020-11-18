<?php
require_once('vendor/autoload.php');

// Set with a valid test API key.
$stripe = new \Stripe\StripeClient('sk_test_XXX');

// Create customer without an API version set, this will use the account's default version.
echo "Customer created wtihout setting an API version:\n";
echo $stripe->customers->create(['email' => 'jenny.rosen@example.com', 
  'description' => 'customer created using default account API version']);

 // Set the API version globally for all requests.
 // Set with a valid test API key.
$stripeWithGlobalAPIVersionSet = new \Stripe\StripeClient([
  'api_key' => 'sk_test_XXX',
  'stripe_version' => '2020-08-27'
]);
echo "\nCustomer created with global API version:\n";
echo $stripeWithGlobalAPIVersionSet->customers->create(['email' => 'jenny.rosen@example.com', 
  'description' => 'customer created global API version set']);

// Set API version per request.
echo "\nCustomer created with API version set on the request:\n";
echo $stripe->customers->create([
  'email' => 'jenny.rosen@example.com', 
  'description' => 'customer created with API version set on request'
], [
  'stripe_version' => '2020-08-27'
] 
);

// Retrieve the customer.created event or look at it in the Dashboard: https://dashboard.stripe.com/test/events 
// In this case example we're making the assumption the last event was the one we wanted. 
// The customer object in the event payload will be based off of the API version your
// account is set to. 
// Be sure to watch the pagination video to learn more about listing objects :)     
$events = $stripe->events->all(['limit' => 1]);
echo "\ncustomer created event :\n";
echo $events->data[0];

// Create a webhook endpoint and set its API version.
$stripe->webhookEndpoints->create([
  'api_version' => '2020-08-27',
  'url' => 'https://example.com/my/webhook/endpoint',
  'enabled_events' => [
    'customer.created'
  ],
]);

// Create a new customer to see an event sent to the endpoint.
$stripe->customers->create(['email' => 'jenny.rosen@example.com', 
  'description' => 'customer created to see webhook event']);

// Visit the Dashboard page for the endpoint you just created:
// https://dashboard.stripe.com/test/webhooks/we_XXX  
// Under "Webhook Attempts" you'll see the event data Stripe has sent to the endpoint 
// for the customer that was just created. 
// Since we created the endpoint using the  2020-08-27 API version, the customer object 
// in the payload is using that version and not the version used to create the customer. 
echo "\nAll done, visit https://dashboard.stripe.com/test/webhooks to see what was sent to the endpoint";
