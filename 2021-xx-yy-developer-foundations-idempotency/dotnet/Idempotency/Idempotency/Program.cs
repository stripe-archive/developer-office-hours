using System;
using Stripe;

namespace Idempotency
{
    class CreateCustomer
    {
        public static void Run()
        {
            // StripeConfiguration.MaxNetworkRetries = 2;

            // System.Diagnostics.Debug.WriteLine(Guid.NewGuid().ToString());

            StripeConfiguration.ApiKey = "sk_test_xxx";

            var options = new CustomerCreateOptions
            {
                Email = "foo@bar.com",
            };

            var reqestOptions = new RequestOptions()
            {
                IdempotencyKey = "a-long-random-string-20201029163742",
            };

            var service = new CustomerService();
            service.Create(options, reqestOptions);
        }
    }

    class CreateUuid
    {
        public static void Run()
        {
            System.Diagnostics.Debug.WriteLine(Guid.NewGuid().ToString());
        }
    }

    class MaxNetworkRetries
    {
        public static void Run()
        {
            System.Diagnostics.Debug.WriteLine("running...");
            StripeConfiguration.ApiKey = "sk_test_xxx";

            StripeConfiguration.MaxNetworkRetries = 3;

            var options = new CustomerCreateOptions
            {
                Email = "foo@bar.com",
            };

            var service = new CustomerService();
            service.Create(options);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            CreateCustomer.Run();
            CreateUuid.Run();
            MaxNetworkRetries.Run();
        }
    }
}
