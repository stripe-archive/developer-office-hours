<?php
require_once('vendor/autoload.php');

// Cursor-based pagination (legacy pattern)
// \Stripe\Stripe::setApiKey('sk_test_51HcmwVKtORRCudu1Z6V90FT2UzpG7M9v7PrTA71NRgvorPJFtZN7RS9adCAHXn1qWOV8HNx3NynFf0Iem6OwVvWB00kvzdeTz2');
// $customer_ids = [];
// $customers = \Stripe\Customer::all(["limit" => 100]);
// foreach($customers as $customer) {
// 	array_push($customer_ids, $customer->id);
// }
// while($customers->has_more) {
// 	$customers = \Stripe\Customer::all([
// 		'limit' => 100, 
// 		'starting_after'=> $customers->data[count($customers->data) - 1]->id,
// 	]);
// 	foreach($customers as $customer) {
// 		array_push($customer_ids, $customer->id);
// 	}
// }
// print_r($customer_ids);
// echo "# of customers: ".(count($customer_ids));
// echo "\n";

// Auto-pagination (legacy pattern)
// \Stripe\Stripe::setApiKey('sk_test_51HcmwVKtORRCudu1Z6V90FT2UzpG7M9v7PrTA71NRgvorPJFtZN7RS9adCAHXn1qWOV8HNx3NynFf0Iem6OwVvWB00kvzdeTz2');
// $customer_ids = [];
// $customers = \Stripe\Customer::all(["limit" => 100]);
// foreach($customers->autoPagingIterator() as $customer) {
// 	array_push($customer_ids, $customer->id);
// }

// print_r($customer_ids);
// echo "# of customers: ".(count($customer_ids));
// echo "\n";

// Cursor-based pagination (client/services pattern)
// $stripe = new \Stripe\StripeClient('sk_test_51HcmwVKtORRCudu1Z6V90FT2UzpG7M9v7PrTA71NRgvorPJFtZN7RS9adCAHXn1qWOV8HNx3NynFf0Iem6OwVvWB00kvzdeTz2');
// $customer_ids = [];
// $customers = $stripe->customers->all(['limit' => 100]);
// foreach($customers as $customer) {
// 	array_push($customer_ids, $customer->id);
// }
// while($customers->has_more) {
// 	$customers = $stripe->customers->all([
// 		'limit' => 100, 
// 		'starting_after'=> $customers->data[count($customers->data) - 1]->id,
// 	]);
// 	foreach($customers as $customer) {
// 		array_push($customer_ids, $customer->id);
// 	}
// }
// print_r($customer_ids);
// echo "# of customers: ".(count($customer_ids));
// echo "\n";

// Auto-pagination (client/services pattern)
$stripe = new \Stripe\StripeClient('sk_test_51HcmwVKtORRCudu1Z6V90FT2UzpG7M9v7PrTA71NRgvorPJFtZN7RS9adCAHXn1qWOV8HNx3NynFf0Iem6OwVvWB00kvzdeTz2');
$customer_ids = [];
$customers = $stripe->customers->all(['limit' => 100]);
foreach($customers->autoPagingIterator() as $customer) {
	array_push($customer_ids, $customer->id);
}

print_r($customer_ids);
echo "# of customers: ".(count($customer_ids));
echo "\n";