class ProcessEventsJob < ApplicationJob
  queue_as :default

  def perform(webhook_event_id)
    event = WebhookEvent.find(webhook_event_id)
    if event.source == 'stripe'
      Events::StripeHandler.process(event)
    elsif event.source == 'github'
      # Events::GitHubHandler.process(event)
    end
  end
end
