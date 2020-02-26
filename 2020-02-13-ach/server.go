package main

import (
  "fmt"
  "net/http"
  "os"

  "github.com/joho/godotenv"
  "github.com/foolin/goview/supports/echoview"
  "github.com/labstack/echo"
  "github.com/labstack/echo/middleware"
  "github.com/plaid/plaid-go/plaid"
  "github.com/stripe/stripe-go"
  "github.com/stripe/stripe-go/customer"
  "github.com/stripe/stripe-go/paymentsource"
)

func main() {
  err := godotenv.Load(".env")
  if err != nil {
    fmt.Println("Error loading .env file")
  }
  stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
  e := echo.New()
  e.Use(middleware.Logger())
  e.Use(middleware.Recover())
  e.Renderer = echoview.Default()
  e.Static("/", os.Getenv("STATIC_DIR"))
  e.File("/", os.Getenv("STATIC_DIR") + "/index.html")
  e.File("/manual", os.Getenv("STATIC_DIR") + "/manual.html")
  e.File("/verify", os.Getenv("STATIC_DIR") + "/verify.html")
  e.GET("/public-keys", publicKeyHandler)
  e.POST("/exchange-tokens", exchangeTokenHandler)
  e.POST("/create-customer", createCustomerHandler)
  e.POST("/verify", verifyHandler)

  e.Logger.Fatal(e.Start("localhost:4242"))
}

// VerifyParams Alias for deserializing json
type VerifyParams struct {
  Amounts [2]int64 `json:"amounts"`
  Customer string `json:"customer"`
  BankAccount string `json:"bank_account"`
}
func verifyHandler(c echo.Context) (err error) {
  params := &VerifyParams{}
  if err := c.Bind(params); err != nil {
    return err
  }
  verifyParams := &stripe.SourceVerifyParams{
    Amounts: params.Amounts,
    Customer: stripe.String(params.Customer),
  }
  ba, err := paymentsource.Verify(params.BankAccount, verifyParams)
  if err != nil {
    if stripeErr, ok := err.(*stripe.Error); ok {
      return c.JSON(http.StatusBadRequest, stripeErr)
    }
  }
  return c.JSON(http.StatusOK, ba)
}

// CreateCustomerParams Alias for deserializing json
type CreateCustomerParams struct {
  BankAccount string `json:"bank_account"`
}
func createCustomerHandler(c echo.Context) (err error) {
  params := &CreateCustomerParams{}
  if err := c.Bind(params); err != nil {
    return err
  }
  cusParams := &stripe.CustomerParams{}
  cusParams.SetSource(params.BankAccount)
  cus, err := customer.New(cusParams)
  if err != nil {
    if stripeErr, ok := err.(*stripe.Error); ok {
      return c.JSON(http.StatusBadRequest, stripeErr)
    }
  }
  return c.JSON(http.StatusOK, cus)
}

// ExchangeTokenParams Alias for deserializing json
type ExchangeTokenParams struct {
  PublicToken string `json:"public_token"`
  AccountID string `json:"account_id"`
}

func exchangeTokenHandler(c echo.Context) (err error) {
  params := &ExchangeTokenParams{}
  if err := c.Bind(params); err != nil {
    return err
  }

  // Using Plaid's Go bindings (https://github.com/plaid/plaid-go)
  clientOptions := plaid.ClientOptions{
    os.Getenv("PLAID_CLIENT_ID"),
    os.Getenv("PLAID_SECRET"),
    os.Getenv("PLAID_PUBLIC_KEY"),
    plaid.Sandbox,
    &http.Client{},
  }
  client, _ := plaid.NewClient(clientOptions)
  exchangeResp, _ := client.ExchangePublicToken(params.PublicToken)
  stripeTokenResp, _ := client.CreateStripeToken(
    exchangeResp.AccessToken,
    params.AccountID,
  )
  stripeBankAccountToken := stripeTokenResp.StripeBankAccountToken
  return c.JSON(http.StatusOK, stripeBankAccountToken)
}

// PublicKeys Alias for deserializing json
type PublicKeys struct {
  StripeKey string `json:"stripe_key"`
  PlaidKey string `json:"plaid_key"`
}
func publicKeyHandler(c echo.Context) (err error) {
  data := PublicKeys{
    StripeKey: os.Getenv("STRIPE_SECRET_KEY"),
    PlaidKey: os.Getenv("PLAID_PUBLIC_KEY"),
  }
  return c.JSON(http.StatusOK, data)
}
