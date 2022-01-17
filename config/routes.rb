Rails.application.routes.draw do
  devise_for :users
  # get '/' => 'welcome#home'
  # get 'home' => 'welcome#home'
  get 'app' => 'welcome#app'
  namespace :api do 
    namespace :v1 do 
      resources :posts
    end 
  end
 get "*path", to: "welcome#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
