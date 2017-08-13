class CreateSongs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :author
      t.string :title
      t.string :ccli_number

      t.timestamps
    end
  end
end
