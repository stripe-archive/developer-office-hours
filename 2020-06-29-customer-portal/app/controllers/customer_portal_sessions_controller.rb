class CustomerPortalSessionsController < ApplicationController
  def create
    portal_session = Stripe::BillingPortal::Session.create({
      customer: current_user.stripe_customer_id,
      return_url: 'http://localhost:3000/episodes',
    })
    redirect_to portal_session.url
  end
end
