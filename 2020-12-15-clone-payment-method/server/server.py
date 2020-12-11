#! /usr/bin/env python3.6

"""
server.py
Stripe Sample.
Python 3.6 or newer required.
"""

import stripe
import json
import os

from flask import Flask, render_template, jsonify, request, send_from_directory
from dotenv import load_dotenv, find_dotenv

# Setup Stripe python client library
load_dotenv(find_dotenv())
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

static_dir = str(os.path.abspath(os.path.join(__file__ , "..", os.getenv("STATIC_DIR"))))
app = Flask(__name__, static_folder=static_dir, static_url_path="", template_folder=static_dir)

PLATFORM_CUSTOMER =os.getenv("STRIPE_PLATFORM_CUSTOMER_ID")
CONNECTED_CUSTOMER= os.getenv("STRIPE_CONNECTED_CUSTOMER_ID")
CONNECTED_ACCOUNT = os.getenv("STRIPE_CONNECTED_ACCOUNT_ID")

@app.route('/', methods=['GET'])
def index():

    # List the Payment Methods for the Customer on the Platform account
    cards = stripe.PaymentMethod.list(customer=PLATFORM_CUSTOMER, type="card")

    return render_template(
        'index.html',
        cards=cards, 
        connected_account=CONNECTED_ACCOUNT, 
        publishable_key=os.getenv("STRIPE_PUBLISHABLE_KEY")
    )

# Create route for sharing a card from the Platform to the Connected Account
@app.route('/share-card', methods=['POST'])
def share_card():

    # Get the payment method from the request body
    payment_method = request.json.get('payment_method')

    # Share the Platform Customer's card with the Connected account
    shared_card = stripe.PaymentMethod.create(
        customer = PLATFORM_CUSTOMER,
        payment_method = payment_method,
        stripe_account = CONNECTED_ACCOUNT,
    )

    return jsonify({'card': shared_card.id})


# Create a route for making a Payment Intent
@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent(): 

    # Create payment intent
    payment_intent = stripe.PaymentIntent.create(
        amount = 999,
        currency = 'usd',
        application_fee_amount = 123,
        stripe_account = CONNECTED_ACCOUNT, 
        customer=CONNECTED_CUSTOMER,
    )

    # Return the payment intent client secret to the frontend
    return jsonify({'client_secret': payment_intent.client_secret})

if __name__== '__main__':
    app.run(port=4242, debug=True)
