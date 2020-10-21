// globally
// const stripe = require('stripe')('sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H');
//

// (async () => {
//   // Per request
//   const stripe = require('stripe')();
//   const customers = await stripe.customers.retrieve('cus_ICiIH7WIPI4Gr1', {
//     api_key: 'sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H'
//   });
//
//
//   console.log(customers);
// })()

// With connect
(async () => {
  const stripe = require('stripe')('sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H');
  const customer = await stripe.customers.retrieve('cus_HDfWzCQ6UEVtfu', {
    stripeAccount: 'acct_1Ey3h1BqeQ4DKpna'
  });

  console.log(customer);
})()














