class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :message
      t.integer :rating
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
