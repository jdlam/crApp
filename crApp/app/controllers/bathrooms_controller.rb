class BathroomsController < ApplicationController
  def index
    @bathrooms = Bathroom.all
  end

  def show
    @bathroom = Bathroom.find(params[:id])
  end

  def new

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
