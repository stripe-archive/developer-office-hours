<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::create(realpath('../../..'));
$dotenv->load();
Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

// Create a database for tracking status of a purchase
// - createSession
// - markSessionPaid
// - getSessionStatus
$db = new SQLite3('./store.db');
$db->exec("CREATE TABLE IF NOT EXISTS sessions(id INTEGER PRIMARY KEY, stripe_id TEXT, status TEXT)");

function createSession($sessionId) {
  global $db;
  $stmt = $db->prepare("INSERT INTO sessions(stripe_id, status) VALUES (:id, 'pending')");
  $stmt->bindValue(':id', $sessionId, SQLITE3_TEXT);
  return $stmt->execute();
}
function markSessionPaid($sessionId) {
  global $db;
  $stmt = $db->prepare("UPDATE sessions SET status='paid' WHERE :id = stripe_id");
  $stmt->bindValue(':id', $sessionId, SQLITE3_TEXT);
  return $stmt->execute();
}
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

// Create Session from POST request
$app->post('/create-session', function(Request $request, Response $response) use ($app)  {
  $params = json_decode($request->getBody());
  try {
    // Pre-fill customer email
    // iDEAL
    $session = \Stripe\Checkout\Session::create([
      'submit_type' => 'donate',
      'billing_address_collection' => 'required',
      'payment_method_types' => ['card', 'ideal'],
      'line_items' => [[
        'name' => 'Photo',
        'description' => 'Fun fun photo!',
        'images' => ['https://example.com/t-shirt.png'],
        'amount' => 500,
        'currency' => 'eur',
        'quantity' => 1,
      ]],
      'success_url' => 'http://localhost:4242/success?session_id={CHECKOUT_SESSION_ID}',
      'cancel_url' => 'http://localhost:4242/cancel',
    ]);
    createSession($session->id);
  } catch (Exception $e) {
    return $response->withJson($e->getJsonBody(), 400);
  }
  return $response->withJson($session);
});

// Retrieve Session status from post request
$app->get('/session-status', function (Request $request, Response $response, array $args) {
  $status = getSessionStatus($request->getQueryParam('session_id'));
  return $response->withJson($status);
});

// Handle webhook event for checkout.session.completed
$app->post('/webhook', function(Request $request, Response $response) use ($app)  {
  $payload = $request->getBody();
  $endpoint_secret = getenv('STRIPE_WEBHOOK_SECRET');
  $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
  $event = null;

  try {
    $event = \Stripe\Webhook::constructEvent(
      $payload, $sig_header, $endpoint_secret
    );
  } catch(\UnexpectedValueException $e) {
    return $response->withJson(['msg' => $e->message], 400);
  } catch(\Stripe\Exception\SignatureVerificationException $e) {
    return $response->withJson(['msg' => $e->message], 401);
  }

  // Handle the checkout.session.completed event
  if ($event->type == 'checkout.session.completed') {
    $session = $event->data->object;

    // Fulfill the purchase...
    handle_checkout_session($session);
  }
  return $response->withJson(['msg' => 'success']);
});

function handle_checkout_session($session) {
  // Send email
  // Talk to shipping API
  // Talk to tax API
  // Talk to inventory management API...
  markSessionPaid($session->id);
}

$app->run();
