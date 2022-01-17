class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [:app]
  def home
    render file: "public/index.html"
  end

  def app
  end
end
