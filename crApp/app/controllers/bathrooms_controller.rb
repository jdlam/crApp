class BathroomsController < ApplicationController

  include SessionsHelper

  def index
    @bathrooms = Bathroom.all.sort_by{ |a| a }
  end

  def search
    @bathrooms = Bathroom.search(params[:name]).order("created_at DESC")
    @search_term = params[:name]
  end

  def show
    @bathroom = Bathroom.find(params[:id])
  end

  def new
  end

  def create
    @bathroom = Bathroom.new(bathroom_params)
    if @bathroom.save
      respond_to do |format|
        format.html { redirect_to '/bathrooms' }
        format.json { render json: @bathroom }
      end
    else
      redirect_to '/bathrooms'
    end
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
