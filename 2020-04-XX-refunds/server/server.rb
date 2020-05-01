require 'stripe'
require 'sinatra'
require 'sinatra/reloader' if development?
require 'dotenv'

# Replace if using a different env file or config
Dotenv.load
Stripe.api_key = ENV['STRIPE_SECRET_KEY']

set :static, true
set :public_folder, File.join(File.dirname(__FILE__), ENV['STATIC_DIR'])
set :views, File.join(File.dirname(__FILE__), ENV['STATIC_DIR'])
set :port, 4242

get '/' do
  content_type 'text/html'
  send_file File.join(settings.public_folder, 'index.html')
end

#show the page for a given customer
get '/customer/:customer_id' do
  content_type 'text/html'
  send_file File.join(settings.public_folder, 'customer.html')
end

#return the payments associated with the customer
get '/customer/:customer_id/payments' do
  customer_id = params['customer_id']
  puts "customer_id is #{customer_id}"

  payments = Stripe::PaymentIntent.list({customer: customer_id, limit:20}).data
  payments = payments.select do | p |
    p.status == 'succeeded'
  end

  #if you haven't migrated to PaymentIntents you'd use charges 
  #charges = Stripe::Charge.list({customer: customer_id, limit: 20}).data


  content_type 'application/json'
  response = 
  {
    payments: payments
  }.to_json
end


post '/refund-payment' do
  params = JSON.parse(request.body.read)

  response = {}

  begin
    request_params = {}
    request_params['payment_intent'] = params['payment_id']
    request_params['reason'] = 'requested_by_customer'
    request_params['expand'] = ['payment_intent']

    if params['amount']
      request_params['amount'] = params['amount']
    end

    refund = Stripe::Refund.create(
      request_params
    )

    response = {
      refund: refund
    }

  rescue Stripe::InvalidRequestError => e
    puts "Error is: #{e}"
    response = {
      error: {
        code: e.error.code,
        message: e.error.message
      } 
    }
  end

  content_type 'application/json'
  response.to_json

end

post '/webhook' do
  # You can use webhooks to receive information about asynchronous payment events.
  # For more about our webhook events check out https://stripe.com/docs/webhooks.
  webhook_secret = ENV['STRIPE_WEBHOOK_SECRET']
  payload = request.body.read
  if !webhook_secret.empty?
    # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, webhook_secret
      )
    rescue JSON::ParserError => e
      # Invalid payload
      status 400
      return
    rescue Stripe::SignatureVerificationError => e
      # Invalid signature
      puts "⚠️  Webhook signature verification failed."
      status 400
      return
    end
  else
    data = JSON.parse(payload, symbolize_names: true)
    event = Stripe::Event.construct_from(data)
  end
  # Get the type of webhook event sent - used to check the status of PaymentIntents.
  event_type = event['type']
  data = event['data']
  data_object = data['object']
  
  case event_type
  when 'charge.refunded'
    charge = data_object
    refund = charge.refunds.data[0]
    if refund.status == 'succeeded'
      puts "#{event.id}:#{event.type} - charge #{charge.id} refunded successfully, refund created was #{refund.id}, amount refunded is #{refund.amount}"
    else
      puts "#{event.id}:#{event.type} - #{refund.status} on charge #{charge.id} had an unexpected refund status #{refund.status}"
    end

  when 'charge.refund.updated'
    refund = data_object
    puts "#{event.id}:#{event.type} - refund was updated"
    prev_attrs = data.previous_attributes
    prev_attrs.each do |key, value| 
      puts "for #{key}, old value: #{replaceNil(value)}, new value: #{replaceNil(refund[key])}"
    end
  else 
    puts "#{event.id}:#{event_type} - unhandled event type received #{event_type}"
  end

  content_type 'application/json'
  {
    status: 'success'
  }.to_json
end

def replaceNil(value)
  value.nil? ? "nil" : value
end
