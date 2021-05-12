const stripe = require('stripe')('sk_test_xxx');

stripe.customers.create({
  email: 'foo@bar.com',
}, {idempotencyKey: 'a-long-random-string-20210115164929'});
