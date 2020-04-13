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

# Create a Plan on Stripe and paste your ID below
plan_id = ""

# Create a Coupon on Stripe and paste the {name: id} of the Coupon below
COUPON_MAP = {
  name: "id",
}

get '/' do
  erb :index
end

get '/subscription/:id' do
  subscription_id = params[:id]

  @subscription = Stripe::Subscription.retrieve(
    {
    id: subscription_id,
    expand: ['latest_invoice'],
  })
  
  @invoice = @subscription.latest_invoice

  erb :subscription
end

post '/subscribe' do
  # 1/ parse out the PaymentMethod ID
  # 2/ create a Stripe Customer, attach the PaymentMethod
  # 3/ create a Subscription on that Customer
  # 4/ parse out and apply coupon to subscription

  data = JSON.parse(request.body.read, symbolize_names: true)
  payment_method_id = data[:payment_method]
  coupon_name = data[:coupon_name]

  coupon_id = COUPON_MAP.key?(coupon_name.to_sym) ? COUPON_MAP[coupon_name.to_sym] : nil

  begin
    customer = Stripe::Customer.create({
      payment_method: payment_method_id,
      description: "Dev office Hours Customer",
    })

    @subscription = Stripe::Subscription.create({
      customer: customer.id,
      default_payment_method: payment_method_id,
      items: [{
        plan: plan_id,
      }],
      coupon: coupon_id,
    })

    status 200
    return @subscription.to_json
  rescue Stripe::StripeError => e
    status 400
    return e.message.to_json
  end
end

post '/coupon' do
  data = JSON.parse(request.body.read, symbolize_names: true)
  coupon_name = data[:coupon]

  if COUPON_MAP.key?(coupon_name.to_sym)
    status 200
    return {is_valid: true}.to_json
  else
    status 400
    return {is_valid: false}.to_json
  end
end
