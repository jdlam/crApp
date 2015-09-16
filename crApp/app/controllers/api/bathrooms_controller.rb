class Api::BathroomsController < ApplicationController

  def index
    render json: Bathroom.all
  end

  def show
    render json: Bathroom.find(params[:id])
  end

  def locate
    coordinates = search_params
    radius = params[:radius].to_f
    distance = radius/70
    latMin = coordinates[:latitude].to_f - distance
    latMax = coordinates[:latitude].to_f + distance
    longMin = coordinates[:longitude].to_f - distance
    longMax = coordinates[:longitude].to_f + distance
    results = Bathroom.where({latitude: (latMin..latMax), longitude: (longMin..longMax)})

    render json: results
  end

  private

  def search_params
    params.require(:coords).permit(:latitude, :longitude)
  end

end
