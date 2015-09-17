class Api::ReviewsController < ApplicationController

  include Api::ReviewsHelper

  before_action :current_api_user!, except: [:bathroom]

  def index
    render json: @current_user.reviews
  end

  def create
    review = @current_user.reviews.create(review_params)
    render json: review
  end

  def show
    render json: @current_user.reviews.find(params[:id])
  end

  # Show bathroom's reviews
  def bathroom
    # still not finished
    @bathroom = Bathroom.find(params[:id])
    render json: @bathroom.reviews
  end

  def destroy
    @current_user.reviews.destroy(params[:id])
    render status: 202
  end

  private

  def review_params
    params.require(:review).permit(:message, :rating, :bathroom_id)
  end

end
