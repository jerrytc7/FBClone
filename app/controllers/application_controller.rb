class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
  before_action :authenticate_user! 

  def after_sign_in_path_for(resource)
    cookies[:user_id] = current_user.id
    cookies[:username] = current_user.email || 'guest'
    app_path
  end

end
