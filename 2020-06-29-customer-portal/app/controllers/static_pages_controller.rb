class StaticPagesController < ApplicationController
  def pricing
    @prices = Stripe::Price.list(
      lookup_keys: ['starter', 'pro', 'enterprise'],
      expand: ['data.product']
    ).data.sort_by {|p| p.unit_amount}
  end

  def success
    if !logged_in?
      redirect_to '/session/new'
    else
      redirect_to '/episodes'
    end
  end
end
