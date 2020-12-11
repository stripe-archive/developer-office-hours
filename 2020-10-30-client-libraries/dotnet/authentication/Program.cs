using System;
using Stripe;

namespace authentication
{
    class Program
    {
        static void Main(string[] args)
        {
            // Globally set API key
            // StripeConfiguration.ApiKey = "sk_test...";
            // var service = new CustomerService();
            // var customer = service.Get("cus_ICiIH7WIPI4Gr1");
            // Console.WriteLine(customer);

            // Per request
            // var service = new CustomerService();
            // var requestOptions = new RequestOptions
            // {
            //   ApiKey = "sk_test...",
            // };
            // var customer = service.Get("cus_ICiIH7WIPI4Gr1", null, requestOptions);
            // Console.WriteLine(customer);

            // With connect
            StripeConfiguration.ApiKey = "sk_test...";
            var service = new CustomerService();
            var requestOptions = new RequestOptions
            {
              StripeAccount = "acct_1Ey3h1BqeQ4DKpna",
            };

            var customers = service.Get("cus_HDfWzCQ6UEVtfu", null, requestOptions);
            Console.WriteLine(customers);
        }
    }
}
