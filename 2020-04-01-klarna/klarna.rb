require 'dotenv/load'
require 'sinatra'
require 'stripe'

Stripe.api_key = ENV['SK_TEST']

class Klarna < Sinatra::Base
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

  get '/products' do
    @products = PRODUCTS

    erb :products
  end

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
        return_url: 'http://localhost:9393/success'
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

    redirect @source.klarna.pay_now_redirect_url
  end

  post '/webhook' do
    event = JSON.parse request.body.read

    case event['type']
    when 'charge.succeeded' 
      status 200 and return
    when 'source.chargeable' 
      amount = event['data']['object']['amount']
      source = event['data']['object']['id']

      Stripe::Charge.create(
        amount: amount,
        currency: 'eur',
        source: source,
        capture: true
      )

      status 200 and return
    end
  end
end
