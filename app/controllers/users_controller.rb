class UsersController < ApplicationController

  include SessionsHelper

  def create
    @user = User.new(user_params)
   if  @user.save
     respond_to do |format|
       format.html { redirect_to '/' }
       format.json { render json: @user }
     end
   else
     redirect_to '/signup'
   end
  end

  def index
    @users = User.all
  end

  def profile
    authorize!
    @user = current_user
    @bathrooms = Bathroom.all
    render layout: 'profile_layout'
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
