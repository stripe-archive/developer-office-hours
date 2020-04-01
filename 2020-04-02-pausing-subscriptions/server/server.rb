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
  @subscriptions = Stripe::Subscription.list(limit: 20).data

  erb :index
end

get '/subscriptions/:id' do
  @subscription = Stripe::Subscription.retrieve(params[:id])

  erb :subscription
end

post '/pause' do
  data = JSON.parse(request.body.read, symbolize_names: true)
  @subscription = Stripe::Subscription.update(
    data[:subscription],
    {
      pause_collection: {
        behavior: data[:behavior],
        resumes_at: data[:resumes_at],
      },
    }
  )
  @subscription.to_json
end

post '/reactivate' do
  data = JSON.parse(request.body.read, symbolize_names: true)

  @subscription = Stripe::Subscription.update(
    data[:subscription],
    {
      pause_collection: ''
    }
  )
  @subscription.to_json
end
