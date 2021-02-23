package main

import (
  "fmt"
  "net/http"
  "os"
  "io"
  "bytes"
  "errors"
  "encoding/json"

  "github.com/joho/godotenv"
  "github.com/stripe/stripe-go/v72"
  // "github.com/stripe/stripe-go/v72/price"
)

func main() {
  err := godotenv.Load()
  if err != nil {
    fmt.Println("Error loading .env file")
  }

  stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

  http.Handle("/", http.FileServer(http.Dir(os.Getenv("STATIC_DIR"))))
  http.HandleFunc("/public-keys", handlePublicKeys)
  http.HandleFunc("/my-post-route", handleMyPost)
  http.HandleFunc("/webhook", handleWebhook)

  // i := price.List(nil)
  // for i.Next() {
  //   p := i.Price()
  //   fmt.Println(p.ID)
  // }
  http.ListenAndServe(":4242", nil)
}

type req struct {
  Name string `json:"name"`
  Email string `json:"email"`
}

func handleMyPost(w http.ResponseWriter, r *http.Request) {
  if r.Method != "POST" {
    http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
    return
  }
  data := req{}
  json.NewDecoder(r.Body).Decode(&data)
  fmt.Println(data)
  fmt.Println(data.Name)
  writeJSON(w, data, nil)
}

func handlePublicKeys(w http.ResponseWriter, r *http.Request) {
  if r.Method != "GET" {
    http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
    return
  }

  data := struct {
    PublicKey string `json:"publicKey"`
  }{
    PublicKey: os.Getenv("STRIPE_PUBLISHABLE_KEY"),
  }
  writeJSON(w, data, nil)
}

func handleWebhook(w http.ResponseWriter, req *http.Request) {
    const MaxBodyBytes = int64(65536)
    req.Body = http.MaxBytesReader(w, req.Body, MaxBodyBytes)
    payload, err := ioutil.ReadAll(req.Body)
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error reading request body: %v\n", err)
        w.WriteHeader(http.StatusServiceUnavailable)
        return
    }

    event := stripe.Event{}

    if err := json.Unmarshal(payload, &event); err != nil {
        fmt.Fprintf(os.Stderr, "Failed to parse webhook body json: %v\n", err.Error())
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    // Unmarshal the event data into an appropriate struct depending on its Type
    switch event.Type {
    case "payment_intent.succeeded":
        var paymentIntent stripe.PaymentIntent
        err := json.Unmarshal(event.Data.Raw, &paymentIntent)
        if err != nil {
            fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
            w.WriteHeader(http.StatusBadRequest)
            return
        }
        // Then define and call a func to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent)
    case "payment_method.attached":
        var paymentMethod stripe.PaymentMethod
        err := json.Unmarshal(event.Data.Raw, &paymentMethod)
        if err != nil {
            fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
            w.WriteHeader(http.StatusBadRequest)
            return
        }
        // Then define and call a func to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod)
    // ... handle other event types
    default:
        fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
    }

    w.WriteHeader(http.StatusOK)
}



func writeJSON(w http.ResponseWriter, v interface{}, err error) {
  type errResp struct {
    Error struct {
      Message string `json:"message"`
    } `json:"error"`
  }
	var respVal interface{}
	if err != nil {
		msg := err.Error()
		var serr *stripe.Error
		if errors.As(err, &serr) {
			msg = serr.Msg
		}
		w.WriteHeader(http.StatusBadRequest)
		var e errResp
		e.Error.Message = msg
		respVal = e
	} else {
		respVal = v
	}

	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(respVal); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		fmt.Println("json.NewEncoder.Encode: %v", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if _, err := io.Copy(w, &buf); err != nil {
		fmt.Println("io.Copy: %v", err)
		return
	}
}
