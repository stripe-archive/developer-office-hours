const stripe = require('stripe')('sk_test...');

(async () => {
  console.log('Making requests!');
  // Create a customer with no params.
  // const customer = await stripe.customers.create();
  // console.log(customer);

  // Fetch a customer
  // const cus = await stripe.customers.retrieve(
  //   'cus_IVRyRXG6HUVua2',
  // );
  // console.log(cus);

  // Craete customer with scalar values
  // const cus = await stripe.customers.create({
  //   email: 'jenny.rosen@example.com',
  //   name: 'Jenny Rosen',
  // })
  // // email=jenny.rosen@examp.com&name=Jenny%20Rosen
  // console.log(cus)

  // Create customer with enum value
  // try {
  //   const cus = await stripe.customers.create({
  //     tax_exempt: 'invalid'
  //   });
  //   console.log(cus.tax_exempt);
  // } catch (e) {
  //   console.log(e);
  // }

  // Make a request with invalid params
  // try {
  //   const cus = await stripe.customers.create({
  //     email_address: 'jennyrosen@example.com'
  //   });
  //   console.log(cus.email);
  // } catch (e) {
  //   console.log(e);
  // }

  // Create a customer with nested object
  // const cus = await stripe.customers.create({
  //   payment_method: 'pm_card_visa',
  //   invoice_settings: {
  //     default_payment_method: 'pm_card_visa',
  //   }
  // });
  // console.log(cus);

  // Create a customer with a list of strings.
  // const cus = await stripe.customers.create({
  //   preferred_locales: ['en', 'es']
  // });
  // console.log(cus);

  // Update the email address for a customer
  // const cus = await stripe.customers.update(
  //   'cus_IVRyRXG6HUVua2', {
  //     email: 'jr2@example.com',
  //   }
  // );
  // console.log(cus.id);
  // console.log(cus.email);

  // Update a customer with nested object data
  // const cus = await stripe.customers.update(
  //   'cus_IVRyRXG6HUVua2', {
  //     invoice_settings: {
  //       custom_fields: [{
  //         name: 'VAT',
  //         value: '123ABC'
  //       }]
  //     }
  //   }
  // )
  // console.log(cus.invoice_settings);

  // Fetch a list of customers
  // const customers = await stripe.customers.list();
  // console.log(customers);
  // console.log(customers.data.map(c => c.id))

  // Filter a list of customers by email
  // const customers = await stripe.customers.list({
  //   email: 'jenny.rosen@example.com'
  // });
  // // /v1/customers?email=jenny.rosen@example.com
  // console.log(customers.data.map(c => c.id))
  // console.log(customers.data.map(c => c.email))

  // Deleting an object
  // const cus = await stripe.customers.del(
  //   'cus_IVRyRXG6HUVua2'
  // )
  // console.log(cus);
  //
  // Custom methods
  // First create a payment intent to confirm.
  // const intent = await stripe.paymentIntents.create({
  //   amount: 1000,
  //   currency: 'usd'
  // });
  // console.log(intent.id);
  // console.log(intent.status);

  // Second, confirm the payment intent
  // const intent = await stripe
  //   .paymentIntents
  //   .confirm(
  //     'pi_1HuSWVCZ6qsJgndJr2xWV3v8', {
  //       payment_method: 'pm_card_visa',
  //     }
  //   )
  // console.log(intent.id);
  // console.log(intent.status);

  // Fetch lines from invoice with nested service
  // method.
  // const lines = await stripe
  //   .invoices
  //   .listLineItems(
  //     'in_1HuPYjCZ6qsJgndJhXQpNBXm', {
  //       limit: 5
  //     }
  //   );
  // console.log(lines);

  // Pass a request header.
  const cus = await stripe.customers.create({
    email: 'jenny.rosen@example.com',
  }, {
    stripeAccount: 'acct_1Ey3h1BqeQ4DKpna'
  })
  console.log(cus);

})();
