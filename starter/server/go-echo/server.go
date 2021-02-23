package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/foolin/goview"
	"github.com/foolin/goview/supports/echoview"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/webhook"
)

func main() {
	err := godotenv.Load("./.env")

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Renderer = echoview.New(goview.Config{
		Root:         os.Getenv("STATIC_DIR"),
		DisableCache: true,
	})

	// Routes
	e.Static("/", os.Getenv("STATIC_DIR"))
	e.GET("/", indexHandler)
	e.POST("/webhook", webhookHandler)

	e.Logger.Fatal(e.Start("localhost:4242"))
}

func indexHandler(c echo.Context) (err error) {
	return c.Render(
		http.StatusOK,
		"index.html",
		map[string]interface{}{
			"name": "Jenny Rosen",
		},
	)
}

func webhookHandler(c echo.Context) (err error) {
	request := c.Request()
	payload, err := ioutil.ReadAll(request.Body)
	if err != nil {
		return err
	}

	var event stripe.Event

	webhookSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	if webhookSecret != "" {
		event, err = webhook.ConstructEvent(payload, request.Header.Get("Stripe-Signature"), webhookSecret)
		if err != nil {
			return err
		}
	} else {
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return err
		}
	}

	switch event.Type {
	case "checkout.session.completed":
		var session stripe.CheckoutSession
		e := json.Unmarshal(event.Data.Raw, &session)
		if e != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\\n", e)
			c.JSON(http.StatusBadRequest, e)
			return
		}

		fmt.Println("Checkout Session: ", session.ID)
	}
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, event)
}
