Rails.application.routes.draw do
  root 'cardholders#index'
  resources :cardholders
  resources :cards
  resources :webhooks
end
