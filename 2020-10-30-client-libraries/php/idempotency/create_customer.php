<?php

require_once('./vendor/autoload.php');

$stripe = new \Stripe\StripeClient(
  'sk_test_xxx'
);

$stripe->customers->create([
  'email' => 'foo@bar.com',
], ['idempotency_key' => 'a-long-random-string-20210115164426']);
