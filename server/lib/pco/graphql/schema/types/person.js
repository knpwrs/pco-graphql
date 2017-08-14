import debug from 'debug';
import { makeLinkResolvers, makeAttributeResolvers } from '../utils';
import { getResourceUrl, getQueryUrl, getTypeUrl } from '../../../api';

const d = debug('app:graphql:person');

export const typeDefs = [`
  # A person added to PCO Services.
  type Person {
    id: ID!

    # This person'sanniversary date.
    anniversary: String
    # The avatar url of this person.
    avatar: String!
    # This person's birthdate.
    birthdate: String
    # Indicates if this person is a child.
    child: Boolean!
    # Date and time this person was created.
    created_at: String!
    # The demographic avatar url associated with this person.
    demographic_avatar_url: String!
    # This person's first name.
    first_name: String
    # This person's given name.
    given_name: String
    # This person's last name.
    last_name: String
    # The name this person goes by.
    goes_by_name: String
    # This person's gender.
    gender: String
    # The grade this person is in.
    grade: Int
    # The year this person graudates or graduated in.
    graduation_year: Int
    # Any medical notes associated with this person.
    medical_notes: String
    # Membership information for this person.
    membership: String
    # The remote id for this person.
    remote_id: Int
    # Indicates if this person is a site administrator.
    site_administrator: Boolean!
    # The status of this person.
    status: String!
    # The date and time this person was last updated.
    updated_at: String!

    # Addresses associated with this person.
    addresses: [Address]
    # Apps this person has access to.
    apps: [App]
    # People connected to this person.
    connected_people: [Person]
    # Emails associated with this person.
    emails: [Email]
    # Phone numbers associated with this person.
    phone_numbers: [PhoneNumber]
  }

  # Input attributes for finding, creating, and updating people.
  input PersonAttributes {
    # This person's given name.
    given_name: String
    # This person's first name.
    first_name: String
    # This person's nickname.
    nickname: String
    # The name this person goes by.
    goes_by_name: String
    # This person's middle name.
    middle_name: String
    # This person's last name.
    last_name: String
    # This person's birthdate.
    birthdate: String
    # This person's anniversary.
    anniversary: String
    # This person's gender.
    gender: String
    # The grade this person is in.
    grade: Int
    # Indicates if this person is a child.
    child: Boolean
    # The status of this person.
    status: String
    # The type of school this person is in, if any.
    school_type: String
    # The year this person graudates or graduated in.
    graduation_year: Int
    # Indicates if this person is a site administrator.
    site_administrator: Boolean
    # Permissions associated with this person.
    people_permissions: String
    # Membership information associated with this person.
    membership: String
    # The remote id for this person.
    remote_id: Int
    # Any medical notes associated with this person.
    medical_notes: String
    # The date and time this person was created.
    created_at: String
    # The date and time this person was last updated.
    updated_at: String
    # The ID of this person.
    id: ID
  }

  # Properties to order people by.
  enum PersonOrderBy {
    given_name, first_name, nickname, goes_by_name, middle_name, last_name,
    birthdate, anniversary, gender, grade, child, status, school_type,
    graduation_year, site_administrator people_permissions, membership,
    remote_id, medical_notes, created_at, updated_at
  }

  extend type Query {
    # Find an invidiual person by ID.
    person(id: ID!): Person
    # Find people matching given parameters.
    people(where: PersonAttributes, order: PersonOrderBy, desc: Boolean, offset: Int, per_page: Int): [Person]
    # Get the total number of people
    totalPeople: Int
  }

  extend type Mutation {
    # Add a person with given attributes.
    addPerson(attributes: PersonAttributes!): Person
    # Update a person with given ID with given attributes.
    updatePerson(id: ID!, attributes: PersonAttributes!): Person
  }
`];

export const resolvers = {
  Person: {
    ...makeAttributeResolvers([
      'anniversary',
      'avatar',
      'birthdate',
      'child',
      'created_at',
      'demographic_avatar_url',
      'first_name',
      'gender',
      'given_name',
      'goes_by_name',
      'grade',
      'graduation_year',
      'last_name',
      'medical_notes',
      'membership',
      'remote_id',
      'site_administrator',
      'status',
      'updated_at',
    ]),
    ...makeLinkResolvers([
      'addresses',
      'apps',
      'connected_people',
      'emails',
      'phone_numbers',
    ]),
  },
  Query: {
    person(root, { id }, { loader }) {
      return loader.load(getResourceUrl('people', 'people', id));
    },
    people(root, args, { loader }) {
      return loader.load(getQueryUrl('people', 'people', args));
    },
    totalPeople: async (root, args, { rawLoader }) => {
      const data = await rawLoader.load(getTypeUrl('people', 'people'));
      return data.meta.total_count;
    },
  },
  Mutation: {
    addPerson: async (root, { attributes }, { post }) => {
      d('Adding a person.');
      d(attributes);
      const { data } = await post(getTypeUrl('people', 'people'), {
        type: 'Person',
        attributes,
      });
      d('Person added.');
      d(data);
      return data;
    },
    updatePerson: async (root, { id, attributes }, { patch }) => {
      d(`Updating a person ${id}.`);
      d(attributes);
      const { data } = await patch(getResourceUrl('people', 'people', id), {
        type: 'Person',
        attributes,
      });
      d('Person updated.');
      d(data);
      return data;
    },
  },
};
