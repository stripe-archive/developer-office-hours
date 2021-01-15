require 'stripe'
require 'sinatra'

set :port, 4242

post '/webhook' do
  # simple deserialization
  # payload = request.body.read

  # json_payload = JSON.parse(payload, symbolize_names: true)
  # event = Stripe::Event.construct_from(json_payload)

  # p event
  # p event.id
  # p event.data.object
  # p event.type

  # signature verification
  payload = request.body.read
  endpoint_secret='whsec_mbjmxn6cxYgp4EGtGqZcewbAm6Ji6Gcp'
  sig_header = request.env['HTTP_STRIPE_SIGNATURE']

  begin
    event = Stripe::Webhook.construct_event(
      payload, sig_header, endpoint_secret
    )
  rescue JSON::ParserError => e
    # Invalid payload
    status 400
    return { error: e }.to_json
  rescue Stripe::SignatureVerificationError => e
    # Invalid signature
    status 400
    return { error: e }.to_json
  end

  p event
  p event.data.object

  content_type 'application/json'
  { status: 'success' }.to_json
end
