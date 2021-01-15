package com.stripe.sample;

import static spark.Spark.port;
import static spark.Spark.post;

import com.google.gson.*;
import com.stripe.Stripe;
import com.stripe.exception.*;
import com.stripe.model.*;
import com.stripe.net.*;

import java.util.HashMap;
import java.util.Map;

public class Server {
  public static void main(String[] args) {
    port(4242);
    post(
      "/webhook",
      (request, response) -> {
        String payload = request.body();
        Event event = null;

        // Simple deserialization:
        // try {
        //   event = ApiResource.GSON.fromJson(payload, Event.class);
        // } catch (JsonSyntaxException e) {
        //   // Invalid payload
        //   response.status(400);
        //   return "";
        // }

        // With signature verification:
        String endpointSecret = "whsec_***";
        String sigHeader = request.headers("Stripe-Signature");

        try {
          event = Webhook.constructEvent(
            payload, sigHeader, endpointSecret
          );
        } catch (JsonSyntaxException e) {
          // Invalid payload.
          response.status(400);
          return "";
        } catch (SignatureVerificationException e) {
          // Invalid signature.
          System.out.println("Signature verification failed.");
          System.out.println(e);
          response.status(400);
          return "";
        }

        System.out.println(event.getId());
        System.out.println(event.getType());
        System.out.println(event.getData().getObject().getClass());

        // Deserialize the nested object inside the event.
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
          stripeObject = dataObjectDeserializer.getObject().get();
        } else {
          // Deserialization failed, probably due to an API version mismatch.
          // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
          // instructions on how to handle this case, or return an error here.
        }

        switch(event.getType()) {
          case "customer.created":
            Customer customer = (Customer) stripeObject;
            System.out.println(customer);
            break;
          default:
            System.out.println("Unhandled event type: " + event.getType());
        }

        response.status(200);
        return "success";
      }
    );
  }
}
