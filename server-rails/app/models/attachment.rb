class Attachment < ApplicationRecord
  extend OrderAsSpecified

  belongs_to :song

  validates :filename, presence: true
  validates :url, presence: true
end
