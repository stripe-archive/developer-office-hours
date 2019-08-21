<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::create(realpath('../../..'));
$dotenv->load();

// Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));
Stripe::setApiKey("sk_test_SBNykmhudnlfe8ccpKfNtA9E00bcqB4TOp");

$app = new Slim\App;

$app->get('/', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/index.html"));
  return $response;
});

// Create a PaymentIntent on the server
$app->get('/payment_intents', function (Request $request, Response $response, array $args) {
  $intent = \Stripe\PaymentIntent::create([
    'amount' => 1099,
    'currency' => 'usd',
  ]);
  ob_start();
  echo("New Order: ".$intent->id);
  error_log(ob_get_clean(), 4);
  return $response->withJson($intent);
});

// Asynchronously fulfill the customer’s order
$app->post('/webhooks', function(Request $request, Response $response) use ($app)  {
  // You can find your endpoint's secret in your webhook settings
  $endpoint_secret = getenv('STRIPE_WEBHOOK_SECRET');
  $payload = $request->getBody();
  $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
  $event = null;

  try {
    $event = \Stripe\Webhook::constructEvent(
      $payload, $sig_header, $endpoint_secret
    );
  } catch(\UnexpectedValueException $e) {
    return $response->withJson(['message' => 'fail'], 400);
  } catch(\Stripe\Error\SignatureVerification $e) {
    return $response->withJson(['message' => 'fail'], 403);
  }

  ob_start();
  if ($event->type == "payment_intent.succeeded") {
    $intent = $event->data->object;
    echo("Paid Order: ".$intent->id);
  } elseif ($event->type == "payment_intent.payment_failed") {
    $intent = $event->data->object;
    $error_message = $intent->last_payment_error ? $intent->last_payment_error->message : "";
    echo("Failed Order: ".$intent->id);
  }
  error_log(ob_get_clean(), 4);

  return $response->withJson(['message'=>'success']);
});

$app->run();
