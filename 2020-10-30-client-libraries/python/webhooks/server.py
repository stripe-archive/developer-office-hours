import stripe
import json
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    # Simple deserialization:
    # json_payload = json.loads(request.data)
    # event = stripe.Event.construct_from(json_payload, stripe.api_key)
    # print(event.type)
    # print(type(event.data.object))
    # print(event.data.object.id)

    # With signature verification:
    payload = request.data
    endpoint_secret = 'whsec_mbjmxn6cxYgp4EGtGqZcewbAm6Ji6Gcp'
    sig_header = request.headers.get('stripe-signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return jsonify({'error': str(e)})
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return jsonify({'error': str(e)})

    print(event.type)
    print(type(event.data.object))
    print(event.data.object.id)

    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(port=4242)
