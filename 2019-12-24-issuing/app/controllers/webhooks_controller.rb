class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    event = Stripe::Event.construct_from(
      JSON.parse(request.body.read, symobolize_names: true)
    )
    case event.type
    when 'issuing_authorization.request'
      # approve or decline
      authorization = event.data.object

      if authorization.pending_authorized_amount <= 5000
        Stripe::Issuing::Authorization.approve(authorization.id, {
          metadata: { reason: "less than or equal $50" }
        })
      else
        Stripe::Issuing::Authorization.decline(authorization.id, {
          metadata: { reason: "more than $50" }
        })
      end
    end

    render json: { message: "success" }
  end
end
