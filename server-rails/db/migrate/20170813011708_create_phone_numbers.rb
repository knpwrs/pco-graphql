class CreatePhoneNumbers < ActiveRecord::Migration[5.1]
  def change
    create_table :phone_numbers do |t|
      t.string :number
      t.integer :location
      t.references :person, foreign_key: true

      t.timestamps
    end
  end
end
