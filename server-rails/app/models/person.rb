class Person < ApplicationRecord
  has_many :phone_numbers
  has_many :emails

  validates :first_name, presence: true
  validates :last_name, presence: true

  accepts_nested_attributes_for :phone_numbers, :emails
end
