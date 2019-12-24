class CardsController < ApplicationController
  def show
    @card = Stripe::Issuing::Card.details(params[:id])
    @transactions = Stripe::Issuing::Transaction.list(card: params[:id])
  end

  def create
    card = Stripe::Issuing::Card.create({
      cardholder: params[:cardholder],
      type: 'virtual',
      currency: 'usd',
      status: 'active',
    })
    redirect_back(fallback_location: "/")
  end
end
