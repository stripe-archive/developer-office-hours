<?php

require_once 'vendor/autoload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  echo json_encode(['error' => 'Invalid request.']);
  exit;
}

// Simple deserialization:
// $payload = file_get_contents('php://input');
// $event = \Stripe\Event::constructFrom(
//   json_decode($payload, true)
// );

// ob_start();
// var_dump($event->type);
// var_dump($event->data->object);
// var_dump($event->data->object->id);
// error_log(ob_get_clean(), 4);

// With signature verification:
$payload = file_get_contents('php://input');
$endpoint_secret = 'whsec_***';
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];

try {
  $event = \Stripe\Webhook::constructEvent(
      $payload, $sig_header, $endpoint_secret
  );
} catch(\UnexpectedValueException $e) {
  // Invalid payload
  http_response_code(400);
  echo $e;
  exit();
} catch(\Stripe\Exception\SignatureVerificationException $e) {
  // Invalid signature
  http_response_code(400);
  echo $e;
  exit();
}

ob_start();
var_dump($event->type);
var_dump($event->data->object);
var_dump($event->data->object->id);
error_log(ob_get_clean(), 4);

echo json_encode(['status' => 'success']);
