import java.util.*;

import com.stripe.Stripe;
import com.stripe.net.*;
import com.stripe.model.*;
import com.stripe.param.*;

public class DemoRequest {
  public static void main(String[] args) {
    Stripe.apiKey = "sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H";
    System.out.println("Make requests!");

    // Create a customer with no params.
    // CustomerCreateParams params =
    //   CustomerCreateParams.builder()
    //     .build();
    // try {
    //   Customer customer = Customer.create(params);
    //   System.out.println(customer);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Fetch a customer
    // try {
    //   Customer customer = Customer.retrieve(
    //       "cus_IVV7iFxlhmoFdX"
    //   );
    //   System.out.println(customer);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Create a customer with scalar values
    // CustomerCreateParams params =
    //   CustomerCreateParams.builder()
    //     .setEmail("jenny.rosen@example.com")
    //     .setName("Jenny Rosen")
    //     .build();
    //
    // try {
    //   Customer customer = Customer.create(
    //       params
    //   );
    //   // email=jenny.rosen@example.com&name=Jenny%20Rosen
    //   System.out.println(customer);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Create a customer with enum
    // CustomerCreateParams params =
    //   CustomerCreateParams.builder()
    //     .setTaxExempt("invalid")
    //     .build();
    // try {
    //   Customer customer = Customer.create(params);
    //   System.out.println(customer);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Create a customer with a nested object
    // CustomerCreateParams params =
    //   CustomerCreateParams.builder()
    //     .setPaymentMethod("pm_card_visa")
    //     .setInvoiceSettings(
    //         CustomerCreateParams
    //           .InvoiceSettings
    //           .builder()
    //           .setDefaultPaymentMethod("pm_card_visa")
    //           .build()
    //     )
    //     .build();
    //
    // try {
    //   Customer customer = Customer.create(params);
    //   System.out.println(customer);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Create customer with a list of strings
    // CustomerCreateParams params =
    //   CustomerCreateParams.builder()
    //     .addPreferredLocale("en")
    //     .addPreferredLocale("es")
    //     .build();
    //
    // try {
    //   Customer customer = Customer.create(params);
    //   System.out.println(customer);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // // Update the email address for a customer
    // CustomerUpdateParams params =
    //   CustomerUpdateParams.builder()
    //     .setEmail("jr-2@example.com")
    //     .build();
    //
    // try {
    //   Customer customer = Customer.retrieve(
    //     "cus_IVV7iFxlhmoFdX"
    //   );
    //   Customer updatedCustomer = customer.update(
    //       params
    //   );
    //   System.out.println(customer.getEmail());
    //   System.out.println(updatedCustomer.getEmail());
    // } catch(Exception e) {
    //   System.out.println(e);
    // }


    // Update a customer with nested params
    // CustomerUpdateParams params =
    //   CustomerUpdateParams.builder()
    //     .setInvoiceSettings(
    //       CustomerUpdateParams
    //         .InvoiceSettings
    //         .builder()
    //         .addCustomField(
    //           CustomerUpdateParams
    //             .InvoiceSettings
    //             .CustomField
    //             .builder()
    //             .setName("VAT")
    //             .setValue("ABC123")
    //             .build()
    //         )
    //         .addCustomField(
    //           CustomerUpdateParams
    //             .InvoiceSettings
    //             .CustomField
    //             .builder()
    //             .setName("VAT2")
    //             .setValue("XYZ987")
    //             .build()
    //         )
    //         .build()
    //     )
    //     .build();
    //
    // try {
    //   Customer customer = Customer.retrieve(
    //     "cus_IVV7iFxlhmoFdX"
    //   );
    //   Customer updatedCustomer = customer.update(
    //       params
    //   );
    //   System.out.println(updatedCustomer.getInvoiceSettings());
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Fetch a list of customers
    // CustomerListParams params =
    //   CustomerListParams.builder()
    //     .setLimit(3L)
    //     .build();
    // try {
    //   CustomerCollection customers =
    //     Customer.list(params);
    //   for(Customer customer : customers.getData()) {
    //     System.out.println(customer.getId());
    //   }
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Fetch a list of customers, filtered by email
    // CustomerListParams params =
    //   CustomerListParams.builder()
    //     .setEmail("jenny.rosen@example.com")
    //     .build();
    // // /v1/customers?email=jenny.rosen@example.com
    // try {
    //   CustomerCollection customers =
    //     Customer.list(params);
    //   for(Customer customer : customers.getData()) {
    //     System.out.println(customer.getId());
    //     System.out.println(customer.getEmail());
    //   }
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Delete a customer
    // try {
    //   // Fetch API call
    //   Customer customer = Customer.retrieve(
    //       "cus_IVV7iFxlhmoFdX"
    //   );
    //   // Delete API call.
    //   Customer deletedCustomer = customer.delete();
    //   System.out.println(deletedCustomer);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Custom methods
    // First, create a payment intent to confirm.
    // PaymentIntentCreateParams params =
    //   PaymentIntentCreateParams.builder()
    //     .setAmount(1000L)
    //     .setCurrency("USD")
    //     .build();
    //
    // try {
    //   PaymentIntent intent =
    //     PaymentIntent.create(params);
    //   System.out.println(intent.getId());
    //   System.out.println(intent.getStatus());
    // } catch(Exception e) {
    //   System.out.println(e);
    // }
    //
    // Second, confirm the payment intent.
    // PaymentIntentConfirmParams params =
    //   PaymentIntentConfirmParams.builder()
    //     .setPaymentMethod("pm_card_visa")
    //     .build();
    //
    // try {
    //   PaymentIntent intent =
    //     PaymentIntent.retrieve(
    //         "pi_1HuUlQCZ6qsJgndJUduLpPGm"
    //     );
    //   PaymentIntent confirmedIntent =
    //     intent.confirm(params);
    //   System.out.println(confirmedIntent.getId());
    //   System.out.println(confirmedIntent.getStatus());
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Nested service method
    // InvoiceLineItemCollectionListParams params =
    //   InvoiceLineItemCollectionListParams.builder()
    //     .setLimit(5L)
    //     .build();
    //
    // try {
    //   Invoice invoice = Invoice.retrieve(
    //       "in_1HuPYjCZ6qsJgndJhXQpNBXm"
    //   );
    //   InvoiceLineItemCollection lines =
    //     invoice.getLines().list(params);
    //   // /v1/invoices/in_xxx/lines?limit=5
    //   System.out.println(invoice.getId());
    //   System.out.println(lines);
    // } catch(Exception e) {
    //   System.out.println(e);
    // }

    // Passing request params in headers
    CustomerCreateParams params =
      CustomerCreateParams.builder()
        .setEmail("jenny.rosen@example.com")
        .build();

    RequestOptions requestOptions =
      RequestOptions.builder()
        .setStripeAccount("acct_1Ey3h1BqeQ4DKpna")
        .build();

    try {
      Customer customer =
        Customer.create(params, requestOptions);
      System.out.println(customer);
    } catch(Exception e) {
      System.out.println(e);
    }
  }
}
