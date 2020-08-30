require 'stripe'
require 'sinatra'
require 'dotenv'

# Replace if using a different env file or config
Dotenv.load
Stripe.api_key = ENV['STRIPE_SECRET_KEY']

set :static, true
set :public_folder, File.join(File.dirname(__FILE__), ENV['STATIC_DIR'])
set :views, File.join(File.dirname(__FILE__), ENV['STATIC_DIR'])
set :port, 4242

get '/' do
  erb :index
end

post '/redirect' do
  price = ENV['PRICE']

  @session = Stripe::Checkout::Session.create({
    mode: 'payment',
    payment_method_types: ['bacs_debit'],
    payment_intent_data: {
      setup_future_usage: 'off_session'
    },
    line_items: [
      {
        price: price,
        quantity: 1
      }
    ],
    success_url: 'http://localhost:4242?success=true',
    cancel_url: 'http://localhost:4242?cance=true',
  })

  @session_id = @session.id

  erb :redirect
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

  if event_type == 'checkout.session.completed'
    puts "🔔  checkout session completed!"
  end

  if event_type == 'checkout.session.async_payment_succeeded'
    puts "🔔  payment succeeded!"
  end

  if event_type == 'checkout.session.async_payment_failed'
    puts "🔔  payment failed!"
  end

  content_type 'application/json'
  {
    status: 'success'
  }.to_json
end
