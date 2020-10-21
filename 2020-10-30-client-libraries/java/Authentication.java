import com.stripe.Stripe;
import com.stripe.param.*;
import com.stripe.model.*;
import com.stripe.net.*;

class Authentication {
    public static void main(String[] args) {
      try {
        // Globally
        // Stripe.apiKey = "sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H";

        // CustomerListParams params = CustomerListParams.builder().build();
        //
        // Per request
        // RequestOptions requestOptions = RequestOptions.builder()
        //   .setApiKey("sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H")
        //   .build();
        // Customer customer = Customer.retrieve("cus_ICiIH7WIPI4Gr1", requestOptions);

        // With connect and API key set per request
        //
        // RequestOptions requestOptions = RequestOptions.builder()
        //   .setStripeAccount("acct_1Ey3h1BqeQ4DKpna")
        //   .setApiKey("sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H")
        //   .build();
        // Customer customer = Customer.retrieve("cus_HDfWzCQ6UEVtfu", requestOptions);

        // With connect and API key set globally.
        Stripe.apiKey = "sk_test_51EceeUCZ6qsJgndJDSi5feJtMJs4e4SOOQL7TIGtQyIA7GsyJczBvxvrFsuB71OkREXySaFDzcjLYb2IoDmuX1jL00e4sdsH5H";
        RequestOptions requestOptions = RequestOptions.builder()
          .setStripeAccount("acct_1Ey3h1BqeQ4DKpna")
          .build();
        // CustomerListParams params = CustomerListParams.builder().build();
        // CustomerCollection customers = Customer.list(params, requestOptions);
        Customer customer = Customer.retrieve("cus_HDfWzCQ6UEVtfu", requestOptions);

        System.out.println(customer);
      } catch(Exception e) {
        System.out.println(e);
      }
    }
}
