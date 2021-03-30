<?php

require '../vendor/autoload.php';

Dotenv\Dotenv::createImmutable(__DIR__ . "/..")->load();

$stripe = new Stripe\StripeClient($_ENV['STRIPE_SECRET_KEY']);
