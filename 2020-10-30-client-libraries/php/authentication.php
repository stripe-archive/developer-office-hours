<?php
require_once('vendor/autoload.php');

// Static methods
// Globally set API key
// \Stripe\Stripe::setApiKey('sk_test...');
//
// echo \Stripe\Customer::retrieve('cus_ICiIH7WIPI4Gr1');

// Per request
// \Stripe\Stripe::setApiKey('sk_test...');
//
// echo \Stripe\Customer::retrieve('cus_ICiIH7WIPI4Gr1', [
//   'api_key' => 'sk_test...'
// ]);

// With connect
// \Stripe\Stripe::setApiKey('sk_test...');
//
// echo \Stripe\Customer::retrieve('cus_HDfWzCQ6UEVtfu', ['stripe_account' => 'acct_1Ey3h1BqeQ4DKpna']);


// Client services
// Globally set API key
// $stripe = new \Stripe\StripeClient('sk_test...');
// echo $stripe->customers->retrieve('cus_ICiIH7WIPI4Gr1');

// Per request
// echo $stripe->customers->retrieve(
//   'cus_ICiIH7WIPI4Gr1',
//   [],
//   ['api_key' => 'sk_test...']
// );

// With connect
$stripe = new \Stripe\StripeClient('sk_test...');

echo $stripe->customers->retrieve('cus_HDfWzCQ6UEVtfu', [], ['stripe_account' => 'acct_1Ey3h1BqeQ4DKpna']);
