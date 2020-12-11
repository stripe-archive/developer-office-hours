using System;
using Stripe;
using System.Collections.Generic;
using System.Linq;

namespace pagination
{
    class Program
    {
        static void Main(string[] args)
        {
        	StripeConfiguration.ApiKey = "sk_test_...";
            Console.WriteLine("Pagination in .NET");

            // Cursor-based pagination
            // List<String> customerIds = new List<String>();
            // var options = new CustomerListOptions
            // {
            //     Limit = 10,
            // };
            // var service = new CustomerService();
            // StripeList<Customer> customers = service.List(options);
            // foreach (Customer c in customers)
            // {
            //     customerIds.Add(c.Id);
            // }

            // while (customers.HasMore)
            // {
            //     options.StartingAfter = customers.Data.Last().Id;
            //     customers = service.List(options);
            //     foreach (Customer c in customers)
            //     {
            //         customerIds.Add(c.Id);
            //     }
            // }
            // string result = string.Join(",", customerIds);
            // Console.WriteLine(result);
            // Console.WriteLine(String.Format("# of customers: {0}", customerIds.Count));

            // Auto-pagination
            List<String> customerIds = new List<String>();
            var options = new CustomerListOptions
            {
                Limit = 100,
            };
            var service = new CustomerService();
            foreach (var c in service.ListAutoPaging(options))
            {
                customerIds.Add(c.Id);
            }

            string result = string.Join(",", customerIds);
            Console.WriteLine(result);
            Console.WriteLine(String.Format("# of customers: {0}", customerIds.Count));
        }
    }
}
