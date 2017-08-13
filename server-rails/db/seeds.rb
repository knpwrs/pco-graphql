# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Person.create(
  :first_name => 'Foo',
  :last_name => 'McBarrington',
  :phone_numbers_attributes => [{
    :number => '888-888-8888',
    :location => 'home',
  }, {
    :number => '777-777-7777',
    :location => 'work',
  }],
  :emails_attributes => [{
    :address => 'foobar@bobmail.info',
    :location => 'home',
  }, {
    :address => 'foobar@reconmail.com',
    :location => 'work',
  }],
)

Person.create(
  :first_name => 'Bar',
  :last_name => 'McBazzington',
  :phone_numbers_attributes => [{
    :number => '555-555-5555',
    :location => 'home',
  }, {
    :number => '444-444-4444',
    :location => 'work',
  }],
  :emails_attributes => [{
    :address => 'barbaz@bobmail.info',
    :location => 'home',
  }, {
    :address => 'barbaz@reconmail.com',
    :location => 'work',
  }],
)
