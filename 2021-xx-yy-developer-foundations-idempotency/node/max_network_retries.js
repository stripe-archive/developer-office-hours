const stripe = require('stripe')('sk_test_xxx, {
  maxNetworkRetries: 2, // Retry a request twice before giving up
});


stripe.customers.create({
  email: 'foo@bar.com',
});
