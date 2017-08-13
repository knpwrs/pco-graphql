class Email < ApplicationRecord
  belongs_to :person

  validates :address, presence: true
  validates :location, presence: true

  enum location: [ :home, :work, :other ]
end
