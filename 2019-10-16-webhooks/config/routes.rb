Rails.application.routes.draw do
  post '/webhook_events/:source', to: 'webhook_events#create'
end
