package main

import (
	"fmt"
	"encoding/json"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/customer"
)

func main() {
	// Set with a valid test API key.
	stripe.Key = "sk_test_XXX"
	fmt.Println("Hello, Metadata!")

	// Create a customer with 2 metadata key value pairs
    params := &stripe.CustomerParams{
		Name: stripe.String("Jenny Rosen"),
	}

	params.AddMetadata("my_app_id", "123")
	params.AddMetadata("my_app_username", "jenny_rosen")
	c, _ := customer.New(params)

	// Print JSON with indents
	prettyJSON, _ := json.MarshalIndent(c, "", "    ")
	fmt.Printf("%s\n", string(prettyJSON))

	// Add additional metadata to an existing object by making an update call.
    // Replace this customer id with the customer you created above.
	updateParams := &stripe.CustomerParams {}
	updateParams.AddMetadata("favorite_animal", "cheetah")
	c, _ = customer.Update(
	  "cus_Ia3U3155KWYe5T",
	  updateParams,
	)
	prettyJSON, _ = json.MarshalIndent(c, "", "    ")
	fmt.Printf("%s\n", string(prettyJSON))

	// Update metadata on an existing object by making an update call.
    // Only the metadata keys you specify in the call will be updated,
    // other keys will remain unchanged.
    // Replace this customer id with the customer you created above.
	updateParams = &stripe.CustomerParams {}
	updateParams.AddMetadata("favorite_animal", "llama")
	c, _ = customer.Update(
	  "cus_Ia3U3155KWYe5T",
	  updateParams,
	)
	prettyJSON, _ = json.MarshalIndent(c, "", "    ")
	fmt.Printf("%s\n", string(prettyJSON))

	// Remove metadata from an object by making an update call.
    // Set the value to the empty string for any metadata you wish to remove from the object.
    // Replace this customer id with the customer you created above.
	updateParams = &stripe.CustomerParams {}
	updateParams.AddMetadata("favorite_animal", "")
	updateParams.AddMetadata("my_app_username", "")
	c, _ = customer.Update(
	  "cus_Ia3U3155KWYe5T",
	  updateParams,
	)
	prettyJSON, _ = json.MarshalIndent(c, "", "    ")
	fmt.Printf("%s\n", string(prettyJSON))
}
