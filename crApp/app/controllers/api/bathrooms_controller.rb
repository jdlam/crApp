class Api::BathroomsController < ApplicationController

  def index
    render json: Bathroom.all
  end

  def show
    render json: Bathroom.find(params[:id])
  end

  def locate
    coordinates = locate_params
    radius = params[:radius].to_f
    distance = radius/70
    latMin = coordinates[:latitude].to_f - distance
    latMax = coordinates[:latitude].to_f + distance
    longMin = coordinates[:longitude].to_f - distance
    longMax = coordinates[:longitude].to_f + distance
    results = Bathroom.where({latitude: (latMin..latMax), longitude: (longMin..longMax)})

    render json: results
  end

  def create
    create_params
    render json: bathroom
  end

  private

  def locate_params
    params.require(:coords).permit(:latitude, :longitude)
  end

  def create_params
    params.require(:bathroom).permit(:name, :address, :city, :state, :zip_code, :latitude, :longitude)
  end

end
