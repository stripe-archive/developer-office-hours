package com.stripe.sample;

import java.nio.file.Paths;
import java.util.*;

import com.stripe.Stripe;
import com.stripe.model.ProductCollection;
import com.stripe.model.Product;

import io.github.cdimascio.dotenv.Dotenv;

import static spark.Spark.port;
import static spark.Spark.staticFiles;
import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.PaymentIntent;
import com.stripe.net.ApiResource;
import com.google.gson.JsonSyntaxException;

public class Server {
  private static Gson gson = new Gson();

  static class CreateCustomerRequest {
    @SerializedName("email")
    String email;

    public String getEmail() {
      return email;
    }
  }

  public static void main(String[] args) {
    port(4242);
    Dotenv dotenv = Dotenv.load();

    Stripe.apiKey = dotenv.get("STRIPE_SECRET_KEY");
    staticFiles.externalLocation(
        Paths.get(Paths.get("").toAbsolutePath().toString(),
          dotenv.get("STATIC_DIR")).normalize().toString());

    get("/public-keys", (request, response) -> {
      response.type("application/json");

      Map<String, Object> responseData = new HashMap<>();
      responseData.put("publishableKey", dotenv.get("STRIPE_PUBLISHABLE_KEY"));
      return gson.toJson(responseData);
    });

    post("/create-customer", (request, response) -> {
      response.type("application/json");
      CreateCustomerRequest data = gson.fromJson(request.body(), CreateCustomerRequest.class);
      System.out.println("The customer's email is: " + data.getEmail());

      // Echo back the same data.
      return gson.toJson(data);
    });

    post("/webhook", (request, response) -> {
      String payload = request.body();
      Event event = null;

      try {
        event = ApiResource.GSON.fromJson(payload, Event.class);
      } catch (JsonSyntaxException e) {
        // Invalid payload
        response.status(400);
        return "";
      }

      // Deserialize the nested object inside the event
      EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
      StripeObject stripeObject = null;
      if (dataObjectDeserializer.getObject().isPresent()) {
        stripeObject = dataObjectDeserializer.getObject().get();
      } else {
        // Deserialization failed, probably due to an API version mismatch.
        // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
        // instructions on how to handle this case, or return an error here.
      }

      // Handle the event
      switch (event.getType()) {
        case "payment_intent.succeeded":
          PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
          System.out.println("Payment succeeded! " + paymentIntent.getId());
          break;
        default:
          System.out.println("Unhandled event type: " + event.getType());
      }

      response.status(200);
      return "";
    });
  }
}
