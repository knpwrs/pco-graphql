module Types
  MutationType = GraphQL::ObjectType.define do
    name "Mutation"
    description "The root mutation type for our app schema."

    field :addPerson do
      type PersonType
      argument :attributes, !PersonInputType
      description "Add a Person."
      resolve ->(obj, args, ctx) { Person.create(args[:attributes].to_h) }
    end

    field :addPhoneNumber do
      type PhoneNumberType
      argument :personId, !types.ID
      argument :attributes, !PhoneNumberInputType
      description "Add a PhoneNumber to a Person."
      resolve ->(obj, args, ctx) {
        person = Person.find(args[:personId])
        person.phone_numbers.create(args[:attributes].to_h)
      }
    end

    field :addEmail do
      type EmailType
      argument :personId, !types.ID
      argument :attributes, !EmailInputType
      description "Add an Email to a Person."
      resolve ->(obj, args, ctx) {
        person = Person.find(args[:personId])
        person.emails.create(args[:attributes].to_h)
      }
    end

    field :addSong do
      type SongType
      argument :attributes, !SongInputType
      description "Add a Song."
      resolve ->(obj, args, ctx) { Song.create(args[:attributes].to_h) }
    end

    field :addAttachment do
      type AttachmentType
      argument :songId, !types.ID
      argument :attributes, !AttachmentInputType
      description "Add an Attachment to a Song."
      resolve ->(obj, args, ctx) {
        song = Song.find(args[:songId])
        song.attachments.create(args[:attributes].to_h)
      }
    end
  end
end
