class CardholdersController < ApplicationController
  def index
    @cardholders = Stripe::Issuing::Cardholder.list
  end

  def new
  end

  def create
    name = "#{params[:first_name]} #{params[:last_name]}"
    cardholder = Stripe::Issuing::Cardholder.create({
      status: 'active',
      type: 'individual',
      email: params[:email],
      name: name,
      billing: {
        name: name,
        address: {
          line1: params[:line1],
          city: params[:city],
          state: params[:state],
          postal_code: params[:postal_code],
          country: 'US',
        },
      },
    })
    redirect_to cardholder_path(cardholder.id)
  end

  def show
    # /cardholders/ich_xxx
    @cardholder = Stripe::Issuing::Cardholder.retrieve(params[:id])
    @cards = Stripe::Issuing::Card.list(cardholder: params[:id])
  end
end
