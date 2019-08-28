<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::create(realpath('../../..'));
$dotenv->load();
Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

$app = new Slim\App;

$app->get('/', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/step_1_save_card.html"));
  return $response;
});

//Create a SetupIntent on the server
$app->get('/setup_intents', function (Request $request, Response $response, array $args) {
  $intent = \Stripe\SetupIntent::create();
  return $response->withJson($intent);
});

//Attach the PaymentMethod to a Customer after success
$app->post('/create_customer', function(Request $request, Response $response) use ($app)  {
  $params = json_decode($request->getBody());
  try {
    $customer = \Stripe\Customer::create([
      'payment_method' => $params->payment_method,
    ]);
  } catch (Exception $e) {
    return $response->withJson($e->getJsonBody());
  }
  return $response->withJson($customer);
});

$app->get('/admin', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/step_2_charge_later.html"));
  return $response;
});

$app->post('/payment_intents', function(Request $request, Response $response) use ($app)  {
  $params = json_decode($request->getBody());
  try {
    $intent = \Stripe\PaymentIntent::create([
      'amount' => 1099,
      'currency' => 'usd',
      'payment_method_types' => ['card'],
      'customer' => $params->customer,
      'payment_method' => $params->payment_method,
      'off_session' => true,
      'confirm' => true,
    ]);
  } catch (Exception $e) {
    return $response->withJson($e->getJsonBody());
  }
  return $response->withJson($intent);
});

$app->get('/complete', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/step_3_complete.html"));
  return $response;
});

$app->get('/payment_intents', function (Request $request, Response $response, array $args) {
  $intent = \Stripe\PaymentIntent::retrieve($request->getQueryParam('id'));
  return $response->withJson($intent);
});

$app->run();
