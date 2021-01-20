<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;
require 'vendor/autoload.php';
// Use a .env file by renaming .env.example to .env in this directory, or
// by updating the secret API key below
//
// $dotenv = Dotenv\Dotenv::create(realpath('../../..'));
// $dotenv->load();
// Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));
Stripe::setApiKey('<enter your stripe secret api key>');

$db = new SQLite3('./store.db');
$db->exec("CREATE TABLE IF NOT EXISTS sessions(id INTEGER PRIMARY KEY, stripe_id TEXT, status TEXT)");
// createSession
function createSession($sessionId) {
  global $db;
  $stmt = $db->prepare("INSERT INTO sessions(stripe_id, status) VALUES (:id, 'pending')");
  $stmt->bindValue(':id', $sessionId, SQLITE3_TEXT);
  return $stmt->execute();
}
// markSessionPaid
function markSessionPaid($sessionId) {
  global $db;
  $stmt = $db->prepare("UPDATE sessions SET status='paid' WHERE :id = stripe_id");
  $stmt->bindValue(':id', $sessionId, SQLITE3_TEXT);
  return $stmt->execute();
}
// getSessionStatus
function getSessionStatus($sessionId) {
  global $db;
  $stmt = $db->prepare("SELECT status FROM sessions WHERE :id = stripe_id");
  $stmt->bindValue(':id', $sessionId, SQLITE3_TEXT);
  $result = $stmt->execute();
  return $result->fetchArray()[0];
}

$app = new Slim\App;

$app->get('/', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/index.html"));
  return $response;
});
$app->get('/success', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/success.html"));
  return $response;
});
$app->get('/cancel', function (Request $request, Response $response, $args) {
  $response->getBody()->write(file_get_contents("../../client/cancel.html"));
  return $response;
});

$app->post('/create-session', function(Request $request, Response $response) use ($app)  {
  $params = json_decode($request->getBody());
  try {
    // One time payments
    $session = \Stripe\Checkout\Session::create([
      'payment_method_types' => ['card', 'ideal'],
      'line_items' => [[
        'name' => 'Photo',
        'description' => 'Fun fun photo',
        'images' => ['https://picsum.photos/280/320?random=4'],
        'amount' => 500,
        'currency' => 'eur',
        'quantity' => 1,
      ]],
      'success_url' => 'http://localhost:4242/success?session_id={CHECKOUT_SESSION_ID}',
      'cancel_url' => 'http://localhost:4242/cancel',
    ]);
    // Subscription recurring payments
    // $session = \Stripe\Checkout\Session::create([
    //   // 'customer' => 'cus_123',
    //   'payment_method_types' => ['card'],
    //   'subscription_data' => [
    //     'items' => [[
    //       'plan' => 'starter',
    //       'quantity' => 1,
    //     ]],
    //   ],
    //   'success_url' => 'http://localhost:4242/success?session_id={CHECKOUT_SESSION_ID}',
    //   'cancel_url' => 'http://localhost:4242/cancel',
    // ]);
    createSession($session->id);
  } catch (Exception $e) {
    return $response->withJson($e->getJsonBody(), 400);
  }
  return $response->withJson($session);
});

$app->post('/webhook', function(Request $request, Response $response) use ($app)  {

  // You can find your endpoint's secret in your webhook settings
  // $endpoint_secret = getenv('STRIPE_WEBHOOK_SECRET');
  $endpoint_secret = '<your stripe webhook signing secret>';
  $payload = $request->getBody();
  $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
  $event = null;

  try {
    $event = \Stripe\Webhook::constructEvent(
      $payload, $sig_header, $endpoint_secret
    );
  } catch(\UnexpectedValueException $e) {
    // Invalid payload
    http_response_code(400);
    exit();
  } catch(\Stripe\Exception\SignatureVerificationException $e) {
    // Invalid signature
    http_response_code(400);
    exit();
  }

  // Handle the checkout.session.completed event
  if ($event->type == 'checkout.session.completed') {
    $session = $event->data->object;

    // Fulfill the purchase...
    handle_checkout_session($session);
  }

  return $response->withJson(['message' => 'success']);
});

$app->get('/session-status', function (Request $request, Response $response, array $args) {
  $status = getSessionStatus($request->getQueryParam('session_id'));
  return $response->withJson($status);
});

function handle_checkout_session($session) {
  // Call out to inventory management system
  // Ding in Slack
  // send an email
  markSessionPaid($session->id);
}

$app->run();
