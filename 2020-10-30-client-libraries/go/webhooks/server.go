package main

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"os"
	"encoding/json"
	"github.com/stripe/stripe-go/v71"
	"github.com/stripe/stripe-go/v71/webhook"
)

func main() {
	http.HandleFunc("/webhook", handleWebhook)
	fmt.Println("Listening on http://localhost:4242")
	http.ListenAndServe("localhost:4242", nil)
}

func handleWebhook(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	const MaxBodyBytes = int64(65536)
	r.Body = http.MaxBytesReader(w, r.Body, MaxBodyBytes)
	payload, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
	}

	// Simple deserialization:
	// event := stripe.Event{}
	// if err := json.Unmarshal(payload, &event); err != nil {
	// 	fmt.Fprintf(os.Stderr, "Error while parsing event. %v\n", err.Error())
	// 	w.WriteHeader(http.StatusOK)
	// }

	// fmt.Println(event)

	// With signature verification:
	endpointSecret := "whsec_***"
	signatureHeader := r.Header.Get("Stripe-Signature")

	event, err := webhook.ConstructEvent(payload, signatureHeader, endpointSecret)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Signature verification failed. %v\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println(event.Data.Object)

	var cus stripe.Customer
	err = json.Unmarshal(event.Data.Raw, &cus)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
		w.WriteHeader(http.StatusBadRequest)
	}

	fmt.Println(cus)

	fmt.Fprintf(w, "{\"status\": \"success\"}")
}
