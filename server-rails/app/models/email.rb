class Email < ApplicationRecord
  belongs_to :person
  enum location: [ :home, :work, :other ]
end
