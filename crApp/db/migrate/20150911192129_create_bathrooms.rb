class CreateBathrooms < ActiveRecord::Migration
  def change
    create_table :bathrooms do |t|
      t.string :name
      t.decimal :avg_rating

      t.timestamps null: false
    end
  end
end
