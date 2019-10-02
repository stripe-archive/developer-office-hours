<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::create(realpath('../../..'));
$dotenv->load();
Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

$app = new Slim\App;

# index - collect payment method
# index - collect email
# create customer
$app->get('/', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/index.html"));
  return $response;
});

$app->post('/create_customer', function(Request $request, Response $response) use ($app)  {
  $params = json_decode($request->getBody());
  try {
    $customer = \Stripe\Customer::create([
      'email' => $param->email,
      'payment_method' => $params->payment_method,
      'invoice_settings' => ['default_payment_method' => $params->payment_method],
    ]);
  } catch (Exception $e) {
    return $response->withJson($e->getJsonBody(), 400);
  }
  return $response->withJson($customer);
});

# pricing - show plans
# pricing - select and subscribe to a plan
$app->get('/pricing', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/pricing.html"));
  return $response;
});

$app->post('/create_subscription', function(Request $request, Response $response) use ($app)  {
  $params = json_decode($request->getBody());
  try {
    $subscription = \Stripe\Subscription::create([
      'customer' => $params->customer,
      'items' => [['plan' => $params->plan]],
      'trial_period_days' => 14,
      'expand' => ['latest_invoice.payment_intent', 'pending_setup_intent']
    ]);
  } catch (Exception $e) {
    return $response->withJson($e->getJsonBody(), 400);
  }
  return $response->withJson($subscription);
});

$app->run();
