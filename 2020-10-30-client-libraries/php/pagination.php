<?php
require_once('vendor/autoload.php');

// Cursor-based pagination (legacy pattern)
// \Stripe\Stripe::setApiKey('sk_test...');
// $customer_ids = [];
// $customers = \Stripe\Customer::all(["limit" => 100]);
// foreach($customers as $customer) {
//  array_push($customer_ids, $customer->id);
// }
// while($customers->has_more) {
//  $customers = \Stripe\Customer::all([
//    'limit' => 100,
//    'starting_after'=> $customers->data[count($customers->data) - 1]->id,
//  ]);
//  foreach($customers as $customer) {
//    array_push($customer_ids, $customer->id);
//  }
// }
// print_r($customer_ids);
// echo "# of customers: ".(count($customer_ids));
// echo "\n";

// Auto-pagination (legacy pattern)
// \Stripe\Stripe::setApiKey('sk_test...');
// $customer_ids = [];
// $customers = \Stripe\Customer::all(["limit" => 100]);
// foreach($customers->autoPagingIterator() as $customer) {
//  array_push($customer_ids, $customer->id);
// }

// print_r($customer_ids);
// echo "# of customers: ".(count($customer_ids));
// echo "\n";

// Cursor-based pagination (client/services pattern)
// $stripe = new \Stripe\StripeClient('sk_test...');
// $customer_ids = [];
// $customers = $stripe->customers->all(['limit' => 100]);
// foreach($customers as $customer) {
//  array_push($customer_ids, $customer->id);
// }
// while($customers->has_more) {
//  $customers = $stripe->customers->all([
//    'limit' => 100,
//    'starting_after'=> $customers->data[count($customers->data) - 1]->id,
//  ]);
//  foreach($customers as $customer) {
//    array_push($customer_ids, $customer->id);
//  }
// }
// print_r($customer_ids);
// echo "# of customers: ".(count($customer_ids));
// echo "\n";

// Auto-pagination (client/services pattern)
$stripe = new \Stripe\StripeClient('sk_test...');
$customer_ids = [];
$customers = $stripe->customers->all(['limit' => 100]);
foreach($customers->autoPagingIterator() as $customer) {
  array_push($customer_ids, $customer->id);
}

print_r($customer_ids);
echo "# of customers: ".(count($customer_ids));
echo "\n";
