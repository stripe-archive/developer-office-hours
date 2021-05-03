package main

import (
  "fmt"

	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/client"
)

func main() {
  params := &stripe.CustomerParams{
    Email: stripe.String("foo@bar.com"),
  }

  config := &stripe.BackendConfig{
    MaxNetworkRetries: stripe.Int64(3),
  }

  sc := &client.API{}

  sc.Init("sk_test_xxx", &stripe.Backends{
    API:     stripe.GetBackendWithConfig(stripe.APIBackend, config),
  })

  customer, _ := sc.Customers.New(params)

  fmt.Println(customer)
}
