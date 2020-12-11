package main

import (
  "fmt"

  "github.com/stripe/stripe-go"
  "github.com/stripe/stripe-go/customer"
  // "github.com/stripe/stripe-go/paymentintent"
  // "github.com/stripe/stripe-go/invoice"
)

func main() {
  stripe.Key = "sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H"
  fmt.Println("Making requests!")

  // Create a customer with no params
  // c, _ := customer.New(nil)
  // fmt.Println(c)

  // Fetch a customer
  // c, _ := customer.Get("cus_IVTjl1Y4JUVONJ", nil)
  // fmt.Println(c)

  // Create a customer with scalar values.
  // params := &stripe.CustomerParams{
  //   Email: stripe.String("jenny.rosen@example.com"),
  //   Name: stripe.String("Jenny Rosen"),
  // }
  // // email=jenny.rosen@example.com&name=Jenny%20Rosen
  // c, _ := customer.New(params)
  // fmt.Println(c)
  // fmt.Println(c.Name)
  // fmt.Println(c.Email)

  // Create a customer with an enum value
  // params := &stripe.CustomerParams{
  //   TaxExempt: stripe.String(string(stripe.CustomerTaxExemptReverse)),
  // }
  // c, _ := customer.New(params)
  // fmt.Println(c.TaxExempt)

  // Create a customer with nested params
  // params := &stripe.CustomerParams{
  //   PaymentMethod: stripe.String("pm_card_visa"),
  //   InvoiceSettings: &stripe.CustomerInvoiceSettingsParams{
  //     DefaultPaymentMethod: stripe.String("pm_card_visa"),
  //   },
  // }
  // c, _ := customer.New(params)
  // fmt.Println(c.InvoiceSettings.DefaultPaymentMethod)

  // Create a customer with a list of Strings
  // params := &stripe.CustomerParams{
  //   PreferredLocales: stripe.StringSlice(
  //     []string{"en", "es"},
  //   ),
  // }
  // c, _ := customer.New(params)
  // fmt.Println(c.PreferredLocales)

  // Update the email address for a customer
  // params := &stripe.CustomerParams{
  //   Email: stripe.String("jr-2@example.com"),
  // }
  // c, _ := customer.Update(
  //   "cus_IVTjl1Y4JUVONJ",
  //   params,
  // )
  // fmt.Println(c.ID)
  // fmt.Println(c.Email)

  // Update customer with nested list of objects
  // params := &stripe.CustomerParams{
  //   InvoiceSettings: &stripe.CustomerInvoiceSettingsParams{
  //     CustomFields: []*stripe.CustomerInvoiceCustomFieldParams{
  //       {
  //         Name: stripe.String("VAT"),
  //         Value: stripe.String("123ABC"),
  //       },
  //     },
  //   },
  // }
  // c, _ := customer.Update(
  //   "cus_IVTjl1Y4JUVONJ",
  //   params,
  // )
  // fmt.Println(*c.InvoiceSettings.CustomFields[0].Name)
  // fmt.Println(*c.InvoiceSettings.CustomFields[0].Value)

  // Fetch list of customers
  // params := &stripe.CustomerListParams{}
  // params.Single = true
  // i := customer.List(params)
  // for i.Next() {
  //   c := i.Customer()
  //   fmt.Println(c.ID)
  // }

  // Filter the list of customers by email
  // params := &stripe.CustomerListParams{
  //   Email: stripe.String("jenny.rosen@example.com"),
  // }
  // // /v1/customers?email=jenny.rosen@example.com
  // params.Single = true
  // i := customer.List(params)
  // for i.Next() {
  //   c := i.Customer()
  //   fmt.Println(c.ID)
  //   fmt.Println(c.Email)
  // }

  // Delete a customer
  // c, _ := customer.Del("cus_IVTjl1Y4JUVONJ", nil)
  // fmt.Println(c)

  // First, create a payment intent to confirm later
  // params := &stripe.PaymentIntentParams{
  //   Amount: stripe.Int64(1000),
  //   Currency: stripe.String(string(stripe.CurrencyUSD)),
  // }
  // pi, _ := paymentintent.New(params)
  // fmt.Println(pi.ID)
  // fmt.Println(pi.Status)

  // Second, confirm payment intent
  // params := &stripe.PaymentIntentConfirmParams{
  //   PaymentMethod: stripe.String("pm_card_visa"),
  // }
  // pi, _ := paymentintent.Confirm(
  //   "pi_1HuTDeCZ6qsJgndJ7QUDL2cL",
  //   params,
  // )
  // fmt.Println(pi.ID)
  // fmt.Println(pi.Status)
  // Nested service method for line items on invoices.
  // params := &stripe.InvoiceLineListParams{
  //   ID: stripe.String("in_1HuPYjCZ6qsJgndJhXQpNBXm"),
  // }
  // // /v1/invoices/in_xxx/lines
  // params.Filters.AddFilter("limit", "", "5")
  // i := invoice.ListLines(params)
  // for i.Next() {
  //   line := i.InvoiceLine()
  //   fmt.Println(line.ID)
  // }

  // Create a customer on a connected account
  params := &stripe.CustomerParams{
    Email: stripe.String("jenny.rosen@example.com"),
  }
  params.SetStripeAccount("acct_1Ey3h1BqeQ4DKpna")

  c, _ := customer.New(params)
  fmt.Println(c.ID)
  fmt.Println(c.Email)
}
