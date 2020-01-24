import stripe
import json
import os
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/success')
def success():
  return render_template('success.html')

@app.route('/cancel')
def cancel():
  return render_template('cancel.html')



# createing sessions
@app.route('/create-session', methods=['POST'])
def create_session():
  data = json.loads(request.data)
  session = stripe.checkout.Session.create(
    success_url='http://localhost:5000/success?id={CHECKOUT_SESSION_ID}',
    cancel_url='http://localhost:5000/cancel',
    submit_type='donate',
    payment_method_types=['card'],
    line_items=[{
      'amount': data['amount'],
      'name': 'Donation',
      'currency': 'USD',
      'quantity': 1
    }],
    metadata={
      'cause': data['cause'],
    }
  )
  return jsonify(session)

# retrieving sessions
@app.route('/retrieve-session')
def retrieve_session():
  session = stripe.checkout.Session.retrieve(
    request.args['id'],
    expand=['payment_intent'],
  )
  return jsonify(session)

# Start server
if __name__ == '__main__':
    app.run(port=4242)
