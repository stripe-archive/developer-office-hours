class WebhookEvent < ApplicationRecord
  enum state: { pending: 0, processing: 1, processed: 2, failed: 3 }
end
