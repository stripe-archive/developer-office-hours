using System;
using System.Collections.Generic;
using Stripe;

namespace metadata
{
    class Program
    {
        static void Main(string[] args)
        {
            // Set with a valid test API key.
            StripeConfiguration.ApiKey = "sk_test_XXX";
            Console.WriteLine("Hello Metadata!");

            // Create a customer with 2 metadata key value pairs
            var options = new CustomerCreateOptions
            {
                Name = "Jenny Rosen",
                Metadata = new Dictionary<string,string>
                {
                    {"my_app_id", "123"},
                    {"my_app_username", "jenny_rosen"},
                }
            };

            var service = new CustomerService();
            var customer = service.Create(options);
            Console.WriteLine(customer);

            // Add additional metadata to an existing object by making an update call.
            // Replace this customer id with the customer you created above.
            var updateOptions = new CustomerUpdateOptions
            {
                Metadata = new Dictionary<string,string>
                {
                    {"favorite_animal", "cheetah"}
                }
            };
            customer = service.Update("cus_IZzl0c2oBOjftt", updateOptions);
            Console.WriteLine(customer);

            // Update metadata on an existing object by making an update call.
            // Only the metadata keys you specify in the call will be updated,
            // other keys will remain unchanged.
            // Replace this customer id with the customer you created above.
            updateOptions = new CustomerUpdateOptions
            {
                Metadata = new Dictionary<string,string>
                {
                    {"favorite_animal", "llama"}
                }
            };
            customer = service.Update("cus_IZzl0c2oBOjftt", updateOptions);
            Console.WriteLine(customer);

            // Remove metadata from an object by making an update call.
            // Set the value to the empty string for any metadata you wish to remove from the object.
            // Replace this customer id with the customer you created above.
            updateOptions = new CustomerUpdateOptions
            {
                Metadata = new Dictionary<string,string>
                {
                    {"favorite_animal", ""},
                    {"my_app_username", ""}
                }
            };
            customer = service.Update("cus_IZzl0c2oBOjftt", updateOptions);
            Console.WriteLine(customer);
        }
    }
}
