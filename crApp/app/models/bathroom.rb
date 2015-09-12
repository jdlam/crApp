class Bathroom < ActiveRecord::Base
  has_many :reviews
  has_many :users, through: :reviews

  def self.search(search)
    where("name ILIKE ?", "%#{search}%")
  end

end
