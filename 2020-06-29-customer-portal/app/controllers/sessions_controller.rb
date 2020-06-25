class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_auth(user_params)
    if @user
      session[:token] = @user.session_token
      redirect_to '/episodes'
    else
      flash.now[:errors] = 'Unable to find user by email / password'
      render :new
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
