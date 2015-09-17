class AddLatLongStreedAddressCityStateZipToBathrooms < ActiveRecord::Migration
  def up
    add_column :bathrooms, :latitude, :numeric
    add_column :bathrooms, :longitude, :numeric
    add_column :bathrooms, :address, :string
    add_column :bathrooms, :city, :string
    add_column :bathrooms, :state, :string
    add_column :bathrooms, :zip_code, :string
  end
  def down
    remove_column :bathrooms, :latitude
    remove_column :bathrooms, :longitude
    remove_column :bathrooms, :address
    remove_column :bathrooms, :city
    remove_column :bathrooms, :state
    remove_column :bathrooms, :zip_code
  end
end
