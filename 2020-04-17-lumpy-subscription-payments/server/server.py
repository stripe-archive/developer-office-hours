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

@app.route('/', methods=['GET'])
def index():
    subscriptions = stripe.Subscription.list(limit=50).data
    return render_template('index.html', subscriptions=subscriptions)


@app.route('/subscriptions/<id>')
def get_subscription(id):
    subscription = stripe.Subscription.retrieve(id)
    return render_template('subscription.html', subscription=subscription)

@app.route('/subscriptions/<id>', methods=['PUT'])
def update_subscription(id):
    subscription = stripe.Subscription.retrieve(id)

    subscription_item = subscription['items']['data'][0]
    current_plan = subscription_item['plan']['id']
    current_quantity = subscription_item['quantity']
    temp_plan = request.json['plan']
    temp_iterations = request.json['iterations']

    # Create schedule from subscription
    schedule = stripe.SubscriptionSchedule.create(from_subscription=subscription.id)

    # Update the schedule with a phase for the temp plan
    # - current phase
    # - temp phase
    # - end result phase (back to the old current)
    schedule = stripe.SubscriptionSchedule.modify(
        schedule.id,
        end_behavior='release',
        phases=[{ # current phase
            'start_date': subscription.current_period_start,
            'end_date': 'now',
            'plans': [{
                'plan': current_plan,
                'quantity': current_quantity,
            }]
        }, { # temp phase
            'start_date': 'now',
            'iterations': temp_iterations,
            'plans': [{
                'plan': temp_plan,
                'quantity': current_quantity,
            }],
        }, { # revert back to old phase
            'iterations': 1,
            'plans': [{
                'plan': current_plan,
                'quantity': current_quantity,
            }],
        }]
    )

    return jsonify(schedule)


@app.route('/webhook', methods=['POST'])
def webhook_received():
    # You can use webhooks to receive information about asynchronous payment events.
    # For more about our webhook events check out https://stripe.com/docs/webhooks.
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    print('event ' + event_type)

    if event_type == 'some.event':
        print('🔔Webhook received!')

    return jsonify({'status': 'success'})


if __name__== '__main__':
    app.run(port=4242)
