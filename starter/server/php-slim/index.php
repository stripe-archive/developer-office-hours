<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

$app = new \Slim\App;

$app->add(function ($request, $response, $next) {
    Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));
    return $next($request, $response);
});

$app->get('/', function (Request $request, Response $response, array $args) {
  return $response->write(file_get_contents(getenv('STATIC_DIR') . '/index.html'));
});

$app->post('/webhook', function(Request $request, Response $response) {
    $params = json_decode($request->getBody(), true);
    $event = \Stripe\Event::constructFrom($params);
    switch($event->type) {
      case 'checkout.session.completed':
        $session = $event->data->object;
        ob_start();
        var_dump('Checkout session completed!' . $session->id);
        error_log(ob_get_clean(), 4);
        break;
    }

    return $response->withJson([ 'status' => 'success' ])->withStatus(200);
});

$app->run();
