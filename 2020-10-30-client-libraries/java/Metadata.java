
import java.util.*;

import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerUpdateParams;

// ./build_java.sh Metadata.java

class Metadata {
    public static void main(String[] args) {
        System.out.println("Hello Metadata!");

        try {
            //Set this to a valid test API key. 
            Stripe.apiKey = "sk_test_XXX";
        
            // Create a customer with 2 metadata key value pairs
            CustomerCreateParams customerParams =
              CustomerCreateParams.builder()
                .setName("Jenny Rosen")
                .putMetadata("my_app_id", "123")
                .putMetadata("my_app_username", "jenny_rosen")
                .build();
            Customer customer = Customer.create(customerParams);

            // Add additional metadata to an existing object by making an update call.
            CustomerUpdateParams params =
                CustomerUpdateParams.builder()
                    .putMetadata("favorite_animal", "cheetah")
                    .build();

            // Replace this customer id with the customer you created above.
            customer = Customer.retrieve("cus_IZzJlYtgNNWc3V");
            customer = customer.update(params);
            System.out.println(customer);

            // Update metadata on an existing object by making an update call.
            // Only the metadata keys you specify in the call will be updated,
            // other keys will remain unchanged.
            params = CustomerUpdateParams.builder()
                .putMetadata("favorite_animal", "llama")
                .build();

            // Replace this customer id with the customer you created above.
            customer = Customer.retrieve("cus_IZzJlYtgNNWc3V");
            customer = customer.update(params);
            System.out.println(customer);

            // Remove metadata from an object by making an update call.
            // Set the value to the empty string for any metadata you wish to remove from the object.
            params = CustomerUpdateParams.builder()
                .putMetadata("favorite_animal", "")
                .putMetadata("my_app_username", "")
                .build();

            // Replace this customer id with the customer you created above.
            customer = Customer.retrieve("cus_IZzJlYtgNNWc3V");
            customer = customer.update(params);
            System.out.println(customer);
        } catch(Exception e) {
            System.out.println(e);
        }
    }
}