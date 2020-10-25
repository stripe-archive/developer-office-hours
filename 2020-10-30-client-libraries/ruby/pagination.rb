require 'stripe'

Stripe.api_key = 'sk_test_51HcmwVKtORRCudu1Z6V90FT2UzpG7M9v7PrTA71NRgvorPJFtZN7RS9adCAHXn1qWOV8HNx3NynFf0Iem6OwVvWB00kvzdeTz2'
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