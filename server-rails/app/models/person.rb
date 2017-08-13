class Person < ApplicationRecord
  has_many :phone_numbers
  has_many :emails
  validates :first_name, presence: true
  validates :last_name, presence: true
end
