using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;

namespace server.Controllers
{
    public class PaymentsController : Controller
    {
        public readonly IOptions<StripeOptions> options;
        // private readonly IStripeClient client;

        public PaymentsController(IOptions<StripeOptions> options)
        {
            this.options = options;
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
            // Simple deserialization:
            // var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            // var stripeEvent = EventUtility.ParseEvent(json);
            // Console.WriteLine(stripeEvent);
            // Console.WriteLine(stripeEvent.Type);

            // With signature verification:
            try {
                var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
                var endpointSecret = "whsec_***";
                var signatureHeader = Request.Headers["Stripe-Signature"];

                var stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, endpointSecret);
                Console.WriteLine(stripeEvent);
                Console.WriteLine(stripeEvent.Type);

                if(stripeEvent.Type == Events.CustomerCreated) {
                    var customer = stripeEvent.Data.Object as Customer;
                    Console.WriteLine(customer);
                    Console.WriteLine(customer.Id);
                }
            } catch (StripeException e) {
                Console.WriteLine(e);
                return BadRequest();
            } catch (Exception e) {
                Console.WriteLine(e);
                return BadRequest();
            }

            return Ok();
        }
    }
}
