class BathroomsController < ApplicationController

  include SessionsHelper

  def index
    @bathrooms = Bathroom.all
    render layout: 'bathroom_layout'
  end

  def search
    @bathrooms = Bathroom.search({name: params[:name]})
    @search_term = params[:name]
  end

  def show
    @bathroom = Bathroom.find(params[:id])
  end

  def new
    render layout: 'bathroom_layout'
  end

  def create
    @bathroom = Bathroom.new(bathroom_params)
  end

  def destroy
    bathroom = Bathroom.find(params[:id])
    bathroom.destroy
    redirect_to bathroom_index_path
  end

  private

  def bathroom_params
    # will require bathroom to permit other fields as we add them
    # like location, address, city, zip code, etc.
    params.require(:bathroom).permit(:name)
  end
end
