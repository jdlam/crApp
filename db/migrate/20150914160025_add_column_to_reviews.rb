class AddColumnToReviews < ActiveRecord::Migration
  def change

    add_column :reviews, :bathroom_id, :integer

  end
end
