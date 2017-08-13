class PhoneNumber < ApplicationRecord
  belongs_to :person
  enum location: [ :mobile, :home, :work, :pager, :fax, :skype, :other ]
end
