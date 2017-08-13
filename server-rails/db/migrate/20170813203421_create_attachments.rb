class CreateAttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :attachments do |t|
      t.string :filename
      t.string :url
      t.references :song, foreign_key: true

      t.timestamps
    end
  end
end
