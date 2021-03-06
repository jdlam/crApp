class SessionsController < ApplicationController

  def create
    @user = User.find_by(username: user_params[:username])
    if @user && @user.authenticate(user_params[:password])
      session[:user_id] = @user.id
      redirect_to '/users/profile'
    else
      redirect_to '/'
    end

  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
