// globally
// const stripe = require('stripe')('sk_test...');
//

// (async () => {
//   // Per request
//   const stripe = require('stripe')();
//   const customers = await stripe.customers.retrieve('cus_ICiIH7WIPI4Gr1', {
//     api_key: 'sk_test...'
//   });
//
//
//   console.log(customers);
// })()

// With connect
(async () => {
  const stripe = require('stripe')('sk_test...');
  const customer = await stripe.customers.retrieve('cus_HDfWzCQ6UEVtfu', {
    stripeAccount: 'acct_1Ey3h1BqeQ4DKpna'
  });

  console.log(customer);
})()
