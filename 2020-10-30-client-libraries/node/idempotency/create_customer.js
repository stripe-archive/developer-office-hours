// For more information about this demo, please see:
//   https://www.youtube.com/watch?v=3-erqAmS8Ak

const stripe = require('stripe')('sk_test_xxx');

stripe.customers.create({
  email: 'foo@bar.com',
}, {idempotencyKey: 'a-long-random-string-20210115164929'});
