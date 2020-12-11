using System;
using System.Collections.Generic;
using Stripe;

namespace requests
{
  class Program
  {
    static void Main(string[] args)
    {
      StripeConfiguration.ApiKey = "sk_test...";

      // Create a customer with no params
      // var service = new CustomerService();
      // var customer = service.Create(null);
      // Console.WriteLine(customer);

      // Fetch a customer
      // var service = new CustomerService();
      // var customer = service.Get("cus_IVWUttsQxP1gk9");
      // Console.WriteLine(customer);
      // /v1/customers/cus_IVWUttsQxP1gk9

      // Create a customer with scalar values
      // var options = new CustomerCreateOptions
      // {
      //   Name = "Jenny Rosen",
      //   Email = "jenny.rosen@example.com",
      // };
      // // name=Jenny%20Rosen&email=jenny.rosen@example.com
      // var service = new CustomerService();
      // var customer = service.Create(options);
      // Console.WriteLine(customer);

      // Create a customer with an enum
      // var options = new CustomerCreateOptions
      // {
      //   TaxExempt = "invalid",
      // };
      // var service = new CustomerService();
      // var customer = service.Create(options);
      // Console.WriteLine(customer);

      // Create customer with nested object
      // var options = new CustomerCreateOptions
      // {
      //   PaymentMethod = "pm_card_visa",
      //   InvoiceSettings = new CustomerInvoiceSettingsOptions
      //   {
      //     DefaultPaymentMethod = "pm_card_visa",
      //   }
      // };
      //
      // var service = new CustomerService();
      // var customer = service.Create(options);
      // Console.WriteLine(customer);

      // Create a customer with a list of strings
      // var options = new CustomerCreateOptions
      // {
      //   PreferredLocales = new List<string>
      //   {
      //     "en",
      //     "es",
      //   },
      // };
      // var service = new CustomerService();
      // var customer = service.Create(options);
      // Console.WriteLine(customer);
      // Update a customer's email address
      // var options = new CustomerUpdateOptions
      // {
      //   Email = "jr-2@example.com",
      // };
      // var service = new CustomerService();
      // var customer = service.Update(
      //   "cus_IVWUttsQxP1gk9",
      //   options
      // );
      // Console.WriteLine(customer.Id);
      // Console.WriteLine(customer.Email);

      // Update a nested object on the customer
      // var options = new CustomerUpdateOptions
      // {
      //   InvoiceSettings = new CustomerInvoiceSettingsOptions
      //   {
      //     CustomFields = new List<CustomerInvoiceSettingsCustomFieldOptions>
      //     {
      //       new CustomerInvoiceSettingsCustomFieldOptions
      //       {
      //         Name = "VAT",
      //         Value = "ABC123",
      //       },
      //     },
      //   }
      // };
      // var service = new CustomerService();
      // var customer = service.Update(
      //   "cus_IVWUttsQxP1gk9",
      //   options
      // );
      // Console.WriteLine(customer.Id);
      // Console.WriteLine(customer.Email);
      // Console.WriteLine(customer.InvoiceSettings);

      // // Fetch a list of customers
      // var options = new CustomerListOptions
      // {
      //   Limit = 3,
      // };
      // var service = new CustomerService();
      // StripeList<Customer> customers =
      //   service.List(options);
      // foreach(var customer in customers.Data) {
      //   Console.WriteLine(customer.Id);
      // }

      // Fetch a list of customers, filtered by email
      // var options = new CustomerListOptions
      // {
      //   Email = "jenny.rosen@example.com",
      //   Limit = 30,
      // };
      // // /v1/customers?email=jenny.rosen@example.com&limit=30
      // var service = new CustomerService();
      // StripeList<Customer> customers =
      //   service.List(options);
      // foreach(var customer in customers.Data) {
      //   Console.WriteLine(customer.Id);
      //   Console.WriteLine(customer.Email);
      // }

      // // Delete a customer
      // var service = new CustomerService();
      // var customer = service.Delete("cus_IVWUttsQxP1gk9");
      // Console.WriteLine(customer);

      // Custom methods
      // First, create a payment intent to confirm
      // var options = new PaymentIntentCreateOptions
      // {
      //   Amount = 1000,
      //   Currency = "USD",
      // };
      // var service = new PaymentIntentService();
      // var intent = service.Create(options);
      // Console.WriteLine(intent.Id);
      // Console.WriteLine(intent.Status);

      // Second, confirm the payment intent
      // var options = new PaymentIntentConfirmOptions
      // {
      //   PaymentMethod = "pm_card_visa",
      // };
      // var service = new PaymentIntentService();
      // var intent = service.Confirm(
      //   "pi_1HuVqoCZ6qsJgndJiy0a0YRr",
      //   options
      // );
      // Console.WriteLine(intent.Id);
      // Console.WriteLine(intent.Status);

      // Nested service methods
      // var options = new InvoiceListLineItemsOptions
      // {
      //   Limit = 5,
      // };
      // var service = new InvoiceService();
      // var lines = service.ListLineItems(
      //   "in_1HuPYjCZ6qsJgndJhXQpNBXm",
      //   options
      // );
      // Console.WriteLine(lines);

      // Create customer on connected account
      // with request headers.
      var options = new CustomerCreateOptions
      {
        Email = "requestOpt@example.com",
      };
      var requestOptions = new RequestOptions
      {
        StripeAccount = "acct_1Ey3h1BqeQ4DKpna",
      };
      var service = new CustomerService();
      var customer = service.Create(
        options,
        requestOptions
      );
      Console.WriteLine(customer);
    }
  }
}
