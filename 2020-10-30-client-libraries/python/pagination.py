import stripe
import json

stripe.api_key = "sk_test_51HcmwVKtORRCudu1Z6V90FT2UzpG7M9v7PrTA71NRgvorPJFtZN7RS9adCAHXn1qWOV8HNx3NynFf0Iem6OwVvWB00kvzdeTz2"
print ("Pagination in python!")

# Cursor-based pagination
# customer_ids = []
# customers = stripe.Customer.list(limit=10)
# for c in customers:
#   customer_ids.append(c.id)

# while customers.has_more:
#   customers = stripe.Customer.list(limit=10, starting_after=customers.data[-1].id)
#   for c in customers:
#     customer_ids.append(c.id)

# print(json.dumps(customer_ids,  encoding='ascii'))
# print ("# of customers: {:d}".format(len(customers)))

# Auto-pagination
customer_ids = []
customers = stripe.Customer.list(limit=100)
for c in customers.auto_paging_iter():
	customer_ids.append(c.id)

print(json.dumps(customer_ids,  encoding='ascii'))
print("# of customers: {:d}".format(len(customer_ids)))