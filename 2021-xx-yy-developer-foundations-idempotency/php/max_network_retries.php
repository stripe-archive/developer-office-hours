<?php

require_once('./vendor/autoload.php');

$stripe = new \Stripe\StripeClient(
  'sk_test_xxx'
);

\Stripe\Stripe::setMaxNetworkRetries(2);

$stripe->customers->create([
  'description' => 'My First Test Customer (created for API docs)',
]);
