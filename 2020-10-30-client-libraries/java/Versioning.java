import java.util.List;
import com.stripe.Stripe;
import com.stripe.param.*;
import com.stripe.model.*;
import com.stripe.net.*;

class Versioning {
    public static void main(String[] args) {
        System.out.println("Versioning in Java!");
        System.out.println("The Java library is using API version:" + Stripe.API_VERSION);

        try {
            //Set this to a valid test API key. 
            Stripe.apiKey = "sk_test_XXX";
        
            //Create and print a customer to see what the response from library's pinned version looks like.
            CustomerCreateParams customerParams = 
              CustomerCreateParams.builder()
                .setEmail("jenny.rosen@example.com")
                .setDescription("Customer created with API version pinned to library")
                .build();
            Customer customer = Customer.create(customerParams);
            System.out.println("Customer created:");
            System.out.println(customer);

            // Retrieve the customer.created event 
	        // or look at it in the Dashboard: https://dashboard.stripe.com/test/events
	        // The customer object in the event payload will be based off of the version your
            // account is set to.
            EventListParams eventListParams = 
              EventListParams.builder()
                .setLimit(1L)
              .build();
            EventCollection events = Event.list(eventListParams);
            List<Event> eventList = events.getData();
    
            System.out.println("customer.created event:");
            System.out.println(eventList.get(0));

            //Create a webhook endpoint and set it's API version.
            WebhookEndpointCreateParams params = 
              WebhookEndpointCreateParams.builder()
                .setApiVersion(WebhookEndpointCreateParams.ApiVersion.VERSION_2020_08_27)
                .setUrl("https://example.com/my/webhook/endpoint")
                .addEnabledEvent(WebhookEndpointCreateParams.EnabledEvent.CUSTOMER__CREATED)
              .build();

            WebhookEndpoint webhookEndpoint = WebhookEndpoint.create(params);
            
            
            //Create a new customer to see an event sent to the endpoint. 
            customerParams = 
              CustomerCreateParams.builder()
                .setEmail("jenny.rosen@example.com")
                .setDescription("Customer created to see webhook event")
                .build();
            
            customer = Customer.create(customerParams);
            // Visit the Dashboard page for the endpoint you just created:
	        // https://dashboard.stripe.com/test/webhooks/we_XXX  
            // Under "Webhook Attempts" you'll see the event data Stripe has sent to the endpoint 
            // for the customer that was just created. 
	        // Since we created the endpoint using the 2020-08-27 API version, the customer object 
	        // in the payload is using that version. 
	        System.out.println("All done, visit https://dashboard.stripe.com/test/webhooks to see what was sent to the endpoint");
        } catch(Exception e) {
            System.out.println(e);
        }
    }
}
        

