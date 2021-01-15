package com.stripe.app;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.net.RequestOptions;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

public class MaxNetworkRetries
{
  public static void main( String[] args ) throws StripeException {
    Stripe.apiKey = "sk_test_xxx";

    Stripe.setMaxNetworkRetries(3);

    Map<String, Object> params = new HashMap<>();

    params.put(
      "email",
      "foo@bar.com"
    );

    Customer customer = Customer.create(params);
  }
}
