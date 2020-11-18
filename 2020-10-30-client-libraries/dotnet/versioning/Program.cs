using System;
using Stripe;
using System.Collections.Generic;

namespace versioning
{
    class Program
    {
        static void Main(string[] args)
        {
            //Set this to a valid test API key. 
            StripeConfiguration.ApiKey = "sk_test_XXX";
            Console.WriteLine("Versioning in .NET!");
            Console.WriteLine("The .NET library is using API Version: " + StripeConfiguration.ApiVersion);

            //Create and print a customer to see what the response from library's pinned version looks like.
            var customerOptions = new CustomerCreateOptions
            {
                Email = "jenny.rosen@example.com",
                Description = "Customer created with API version pinned to library",
            };
            var customerService = new CustomerService();
            var customer = customerService.Create(customerOptions);
            Console.WriteLine("Customer created:");
            Console.WriteLine(customer);

            // Retrieve the customer.created event 
	        // or look at it in the Dashboard: https://dashboard.stripe.com/test/events
	        // The customer object in the event payload will be based off of the version your
	        // account is set to.
            var eventOptions = new EventListOptions { Limit = 1 };
            var eventService = new EventService();
            StripeList<Event> events = eventService.List(eventOptions);
            Console.WriteLine("customer.created event:");
            Console.WriteLine(events.Data[0]);

            //Create a webhook endpoint and set it's API version.

            var endpointOptions = new WebhookEndpointCreateOptions
            {
                ApiVersion = StripeConfiguration.ApiVersion,
                Url = "https://example.com/my/webhook/endpoint",
                EnabledEvents = new List<String>
                {
                   "customer.created",
                },
            };
            var endpointService = new WebhookEndpointService();
            endpointService.Create(endpointOptions);

            customerOptions.Email = "jenny.rosen@example.com";
            customerOptions.Description = "Customer created using version set on for webhook endpoint";
            customer = customerService.Create(customerOptions);
            
            // Visit the Dashboard page for the endpoint you just created:
	        // https://dashboard.stripe.com/test/webhooks/we_XXX  
	        // Under "Webhook Attempts" you'll see the event data Stripe has sent to the endpoint 
	        // for the customer that was just created. 
	        // Since we created the endpoint using the 2020-08-27 API version, the customer object 
	        // in the payload is using that version. 
            Console.WriteLine("All done, visit https://dashboard.stripe.com/test/webhooks to see what was sent to the endpoint");
        }
    }
}
