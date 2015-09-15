class Api::BathroomsController < ApplicationController

  def index
    render json: Bathroom.all
  end

  def show
    render json: Bathroom.find(params[:id])
  end

end
