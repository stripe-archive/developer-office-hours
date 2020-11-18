package main
import (
	"fmt"
	"encoding/json"
    "github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/customer"
	"github.com/stripe/stripe-go/v72/event"
	"github.com/stripe/stripe-go/v72/webhookendpoint"
)

func main() {
	//Set this to a valid test API key. 
	stripe.Key = "sk_test_XXX"

	fmt.Println("Versioning in Go!")
	fmt.Println("The Go library is using API version: ", stripe.APIVersion)
	
	//Create and print a customer to see what the response from library's pinned version looks like.
	customerParams := &stripe.CustomerParams{
		Email: stripe.String("jenny.rosen@example.com"),
		Description: stripe.String("Customer created with API version pinned to library"),
	}
	cus, _ := customer.New(customerParams)

	// Print Json with indents
	prettyJSON, _ := json.MarshalIndent(cus, "", "    ")
	fmt.Println("Customer created:")
	fmt.Printf("%s\n", string(prettyJSON))

	// Retrieve the customer.created event or look at it in the Dashboard: https://dashboard.stripe.com/test/events
	// In this case example we're making the assumption the last event was the one we wanted.
	// The customer object in the event payload will be based off of the API version your
	// account is set to.
	// Be sure to watch the pagination video to learn more about listing objects :)
    listParams := &stripe.EventListParams{}
	listParams.Filters.AddFilter("limit", "", "1")

	i := event.List(listParams)
	i.Next()
	e := i.Event()
	prettyJSON, _ = json.MarshalIndent(e, "", "    ")
	fmt.Println("customer.created event:")
	fmt.Printf("%s\n", string(prettyJSON))
  
	//Create a webhook endpoint and set its API version.
    endpointParams := &stripe.WebhookEndpointParams{
	    EnabledEvents: []*string{
	        stripe.String("customer.created"),
	    },
		URL: stripe.String("https://example.com/my/webhook/endpoint"),
		APIVersion: stripe.String(stripe.APIVersion),
    }
	webhookendpoint.New(endpointParams)

	//Create a new customer to see an event sent to the endpoint. 
	customerParams = &stripe.CustomerParams{
		Email: stripe.String("jenny.rosen@example.com"),
		Description: stripe.String("Customer created using version set on for webhook endpoint"),
	}
	cus, _ = customer.New(customerParams)

	// Visit the Dashboard page for the endpoint you just created:
	// https://dashboard.stripe.com/test/webhooks/we_XXX  
	// Under "Webhook Attempts" you'll see the event data Stripe has sent to the endpoint 
	// for the customer that was just created. 
	// Since we created the endpoint using the 2020-08-27 API version, the customer object 
	// in the payload is using that version. 
	fmt.Println("All done, visit https://dashboard.stripe.com/test/webhooks to see what was sent to the endpoint")
}
