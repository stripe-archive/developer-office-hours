require 'stripe'

Stripe.api_key = 'sk_test...'
puts 'Pagination in Ruby!'

# Cursor-based pagination
# customers = Stripe::Customer.list({limit: 10})
# customer_ids = []
# customers.each do |customer|
# 	customer_ids << customer.id
# end

# while customers.has_more do
# 	customers = Stripe::Customer.list({limit: 10, starting_after: customers.data.last.id})
# 	customers.each do |customer|
# 		customer_ids << customer.id
# 	end
# end
# puts customer_ids
# puts "# of customers: " + String(customer_ids.length)

# Auto-pagination
customer_ids = []
customers = Stripe::Customer.list({limit: 100})
customers.auto_paging_each do |customer|
	customer_ids << customer.id
end

puts customer_ids
puts "# of customers: " + String(customer_ids.length)
