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
  redirect '/products'
end

PRODUCTS = {
  sku_1: {
    description: 'Gold T-Shirt',
    price: 1000
  },
  sku_2: {
    description: 'Silver T-Shirt',
    price: 2000
  },
  sku_3: {
    description: 'Platinum T-Shirt',
    price: 3000
  }
}

get '/success' do
  erb :success
end

get '/purchase' do
  sku_id = params[:sku_id].to_sym
  amount = PRODUCTS[sku_id][:price]

  @source = Stripe::Source.create(
    type: 'klarna',
    amount: amount,
    currency: 'eur',
    flow: 'redirect',
    redirect: {
      return_url: 'http://localhost:4242/success'
    },
    klarna: {
      product: 'payment',
      purchase_country: 'DE'
    },
    source_order: {
      items: [{
        type: 'sku',
        amount: amount,
        currency: 'eur',
        description: PRODUCTS[sku_id][:description],
        quantity: 1,
      }]
    }
  )

  payment_method_categories = @source.klarna.payment_method_categories.split(',')

  locals = {
    payment_method_categories: payment_method_categories,
    klarna: @source.klarna
  }

  erb :payment_method_categories, locals: locals
end

get '/products' do
  @products = PRODUCTS

  erb :products
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
  source = data['object']

  if event_type == 'source.chargeable'
    Stripe::Charge.create(
      amount: source['amount'],
      currency: 'eur',
      source: source['id'],
      capture: true
    )
  end

  content_type 'application/json'
  {
    status: 'success'
  }.to_json
end
