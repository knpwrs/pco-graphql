class PhoneNumber < ApplicationRecord
  belongs_to :person

  validates :number, presence: true
  validates :location, presence: true

  enum location: [ :mobile, :home, :work, :pager, :fax, :skype, :other ]
end
