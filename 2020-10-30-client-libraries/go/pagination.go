package main

import (
  "fmt"
  "github.com/stripe/stripe-go/v72"
  "github.com/stripe/stripe-go/v72/customer"
)

func main() {
  stripe.Key = "sk_test..."
  fmt.Println("Pagination in Go!")

  // Cursor-based pagination
  // var customerIds []string
  // params := &stripe.CustomerListParams{}
  // params.Single = true
  // params.Filters.AddFilter("limit", "", "10")
  // i := customer.List(params)
  // for i.Next() {
  //   customer := i.Customer()
  //   customerIds = append(customerIds, customer.ID)
  // }

  // for i.Meta().HasMore {
  //   params.Filters.AddFilter("starting_after", "", i.Customer().ID)
  //   i = customer.List(params)
  //   for i.Next() {
  //     customer := i.Customer()
  //     customerIds = append(customerIds, customer.ID)
  //   }
  // }

  // fmt.Println(customerIds)
  // fmt.Printf("# of customers: %d \n", len(customerIds))

  // Auto-pagination
  var customerIds []string
  params := &stripe.CustomerListParams{}
  i := customer.List(params)
  for i.Next() {
    customer := i.Customer()
    customerIds = append(customerIds, customer.ID)
  }

  fmt.Println(customerIds)
  fmt.Printf("# of customers: %d \n", len(customerIds))
}
