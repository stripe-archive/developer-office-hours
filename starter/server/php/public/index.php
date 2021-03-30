<?php
require './shared.php';
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link href="https://stripe-samples.github.io/developer-office-hours/demo.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="main">
      <div id="container">
        <div id="panel">
          <h1>Office Hours</h1>
        </div>
      </div>
    </div>
    <script src="https://js.stripe.com/v3/"></script>
    <script charset="utf-8">
      const stripe = Stripe('<?= $_ENV["STRIPE_PUBLISHABLE_KEY"]; ?>');
    </script>
  </body>
</html>
