module Events
  class StripeHandler
    def self.process(event)
      stripe_event = Stripe::Event.construct_from(event.data)
      puts "--------- Stripe Webhook Recieved #{ stripe_event.type }----------"
      case stripe_event.type
      when 'checkout.session.completed'
        checkout_session = stripe_event.data.object
        sleep(3)
        puts "Email customer #{ checkout_session.customer }"
        sleep(3)
        puts "Pull from inventory - API request to IMS"
        sleep(3)
        puts "Print shipping label"
        sleep(3)
        puts "ding in Slack"
      when 'charge.refunded'
      end
    end
  end
end
