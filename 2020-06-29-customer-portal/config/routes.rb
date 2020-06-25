Rails.application.routes.draw do
  root to: 'static_pages#root'
  get '/pricing', to: 'static_pages#pricing'
  get '/success', to: 'static_pages#success'
  get '/account', to: 'static_pages#account'

  resource :user
  resource :session
  resources :webhooks
  resources :episodes
  resources :customer_portal_sessions, only: [:create]
end
