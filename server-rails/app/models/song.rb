class Song < ApplicationRecord
  has_many :attachments

  validates :author, presence: true
  validates :title, presence: true
  validates :ccli_number, presence: true

  accepts_nested_attributes_for :attachments
end
