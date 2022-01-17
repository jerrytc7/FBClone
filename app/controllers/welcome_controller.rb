class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [:app]
  def home
    if !current_user?
      render file: 'public/guest.html'
    else
      render file: 'public/index.html'
    end
  end

  def app
  end
end
