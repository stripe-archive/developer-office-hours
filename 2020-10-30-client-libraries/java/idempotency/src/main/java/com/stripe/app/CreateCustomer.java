// For more information about this demo, please see:
//   https://www.youtube.com/watch?v=6Ffo4id49QI

package com.stripe.app;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.net.RequestOptions;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

public class CreateCustomer
{
  public static void main( String[] args ) throws StripeException {
    Stripe.apiKey = "sk_test_xxx";

    Map<String, Object> params = new HashMap<>();

    params.put(
      "email",
      "foo@bar.com"
    );

    RequestOptions requestOptions = new RequestOptions.RequestOptionsBuilder()
      .setIdempotencyKey("a-long-random-string-20201030150741")
      .build();

    Customer customer = Customer.create(params, requestOptions);
  }
}
