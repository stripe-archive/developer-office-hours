const Stripe = require("stripe");
const stripe = new Stripe('sk_test...');

(async () => {
  console.log("Pagination in Node!");

  // Cursor-based pagination
  // let customers = await stripe.customers.list({limit: 10})
  // const customerIds = []
  // customers.data.forEach((c) => {
  //  customerIds.push(c.id);
  // })

  // while(customers.has_more) {
  //  customers = await stripe.customers.list({
  //    limit: 10,
  //    starting_after: customers.data[customers.data.length-1].id
  //  })
  //  customers.data.forEach((c) => {
  //    customerIds.push(c.id);
  //  })
  // }

  // console.log(customerIds)
  // console.log("# of customers: %d", customerIds.length)


  // Auto-pagination
  // Documentation on different options for auto-pagination in node:
  // https://github.com/stripe/stripe-node#auto-pagination
  const customerIds = []
  for await (const customer of stripe.customers.list({limit:100})) {
    customerIds.push(customer.id)
  }

  console.log(customerIds)
  console.log("# of customers: %d", customerIds.length)
})();
