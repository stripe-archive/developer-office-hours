import java.util.*;

import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.param.CustomerListParams;


public class Pagination {

    public static void main(String[] args) {
        Stripe.apiKey = "sk_test...";
        System.out.println("Pagination in Java!");

        try {
            // Cursor-based pagination
            // List<String> customerIds = new ArrayList<String>();
            // String lastCustomerId;
            // CustomerListParams params = new CustomerListParams.Builder().build();
            // CustomerCollection customers = Customer.list(params);
            // for(Customer customer : customers.getData()) {
            //     customerIds.add(customer.getId());
            // }
            // while(customers.getHasMore()) {
            //     lastCustomerId = customers.getData().get(customers.getData().size() - 1).getId();
            //     params = new CustomerListParams.Builder()
            //         .setStartingAfter(lastCustomerId)
            //         .setLimit(100L)
            //         .build();
            //     customers = Customer.list(params);
            //     for(Customer customer : customers.getData()) {
            //         customerIds.add(customer.getId());
            //     }
            // }
            // System.out.println(customerIds);
            // System.out.printf("# of customers: %d \n", customerIds.size());

            // Auto-pagination
            List<String> customerIds = new ArrayList<String>();
            String lastCustomerId;
            CustomerListParams params = new CustomerListParams.Builder()
                .setLimit(100L)
                .build();
            Iterable<Customer> itCustomers = Customer.list(params).autoPagingIterable();
            for (Customer customer : itCustomers) {
                customerIds.add(customer.getId());
            }

            System.out.println(customerIds);
            System.out.printf("# of customers: %d \n", customerIds.size());
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
