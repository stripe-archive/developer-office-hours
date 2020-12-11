<?php
require_once('vendor/autoload.php');
$stripe = new \Stripe\StripeClient('sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H');
echo 'Making requests!';

// Create a customer with no params
// $customer = $stripe->customers->create();
// echo $customer;

// Retrieve customer
// $customer = $stripe->customers->retrieve(
//   'cus_IVQK8fvXIjiNv4'
// );
// // /v1/customers/cus_IVQK8fvXIjiNv4
// echo $customer;

// Create a customer with scalar values
// $customer = $stripe->customers->create([
//   'email' => 'jenny.rosen@example.com',
//   'name' => 'Jenny Rosen'
// ]);
// // email=jenny.rosen@example.com&name=Jenny%20Rosen
// echo $customer;
// echo $customer->name;
// echo $customer->email;

// // Create a customer with enum
// $customer = $stripe->customers->create([
//   'tax_exempt' => 'invalid',
// ]);
// echo $customer;

// Create a customer with invalid paramater
// $customer = $stripe->customers->create([
//   'email_address' => 'jr@example.com',
// ]);
// echo $customer;

// Create a customer with nested associative array
// $customer = $stripe->customers->create([
//   'payment_method' => 'pm_card_visa',
//   'invoice_settings' => [
//     'default_payment_method' => 'pm_card_visa',
//   ]
// ]);
// echo $customer->invoice_settings;
//
// // Create customer with list of strings
// $customer = $stripe->customers->create([
//   'preferred_locales' => ['en', 'es'],
// ]);
// echo $customer;
// echo $customer->preferred_locales[0];
// echo $customer->preferred_locales[1];

// Update a customer's email address
// $customer = $stripe->customers->update(
//   'cus_IVQUEtpIEvAEf2',
//   [
//     'email' => 'jr2@example.com'
//   ]
// );
// echo $customer->id . ' ';
// echo $customer->email;

// Update a customer with nested params
// $customer = $stripe->customers->update(
//   'cus_IVQK8fvXIjiNv4',
//   [
//     'invoice_settings' => [
//       'custom_fields' => [[
//         'name' => 'VAT',
//         'value' => '123ABC',
//       ]]
//     ]
//   ]
// );
// echo $customer->invoice_settings;

// Fetch a list of customers
// $customers = $stripe->customers->all();
// echo $customers;
// foreach($customers->data as $cus) {
//   echo $cus->id . "\n";
// }

// Fetch a list of customers, filtered by email
// $customers = $stripe->customers->all([
//   'email' => 'jenny.rosen@example.com',
// ]);
// echo $customers;
// foreach($customers->data as $cus) {
//   echo $cus->id . " " . $cus->email . "\n";
// }

// Delete a customer
// $customer = $stripe->customers->delete(
//   'cus_IVQUEtpIEvAEf2'
// );
// echo $customer;

// Create a payment intent to confirm
// $intent = $stripe->paymentIntents->create([
//   'amount' => 1000,
//   'currency' => 'usd',
// ]);
// echo $intent->id;
// echo $intent->status;

// Confirm a payment intent with custom `confirm`
// method.
// $intent = $stripe->paymentIntents->confirm(
//   'pi_1HuPnyCZ6qsJgndJx8PCuHWs',
//   [
//     'payment_method' => 'pm_card_visa',
//   ]
// );
// echo $intent->id;
// echo $intent->status;

// Nested service method
// $lines = $stripe->invoices->allLines(
//   'in_1HuPYjCZ6qsJgndJhXQpNBXm',
//   [
//     'limit' => 5,
//   ]
// );
// // /v1/invoices/in_xxx/lines?limit=5
// echo $lines;

$customer = $stripe->customers->create([
  'email' => 'jenny.rosen@example.com',
], [
  'stripe_account' => 'acct_1Ey3h1BqeQ4DKpna'
]);
echo $customer;
