package main

import (
  "fmt"
  // "github.com/stripe/stripe-go/client"
  "github.com/stripe/stripe-go"
  "github.com/stripe/stripe-go/customer"
)

func main() {
  // Globally set API key
  // stripe.Key = "sk_test..."
  // c, _ := customer.Get("cus_ICiTLOiirpfd6d", nil)

  // Set API key per request
  // sc := &client.API{}
  // sc.Init("sk_test...", nil)
  // c, _ := sc.Customers.Get("cus_ICiTLOiirpfd6d", nil)
  // fmt.Println(c)

  // With connect:
  stripe.Key = "sk_test..."
  params := &stripe.CustomerParams{}
  params.SetStripeAccount("acct_1Ey3h1BqeQ4DKpna")
  c, _ := customer.Get("cus_HDfWzCQ6UEVtfu", params)
  fmt.Println(c)
}
