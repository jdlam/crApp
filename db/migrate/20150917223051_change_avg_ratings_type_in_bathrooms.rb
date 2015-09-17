class ChangeAvgRatingsTypeInBathrooms < ActiveRecord::Migration
  def change
    change_column :bathrooms, :avg_rating, :real
  end
end
