Rails.application.routes.draw do
  devise_for :users
  get 'welcome/app'
  get 'welcome/home'
  get '/app', to: 'welcome#app', as: 'app'
  get '/' => 'welcome#home'
  get 'home' => 'welcome#home'
  get 'app' => 'welcome#app'

  root 'welcome#home'
  namespace :api do 
    namespace :v1 do 
      resources :posts
    end 
  end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
