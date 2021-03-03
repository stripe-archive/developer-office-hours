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

  public static void main(String[] args) {
    Dotenv dotenv = Dotenv.load();

    // Load the API key from `./.env`
    Stripe.apiKey = dotenv.get("STRIPE_SECRET_KEY");

    // serve static assets, most commonly in `../client`
    port(4242);
    staticFiles.externalLocation(
        Paths.get(Paths.get("").toAbsolutePath().toString(),
          dotenv.get("STATIC_DIR")).normalize().toString());

    // webhook handler for building automations when events
    // fire on your Stripe account.
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

      // Handle events
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
