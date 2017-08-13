class Email < ApplicationRecord
  belongs_to :person

  validates :address, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :location, presence: true

  enum location: [ :home, :work, :other ]
end
