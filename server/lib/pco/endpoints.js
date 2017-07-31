import yuri from 'yuri';
import qs from 'qs';

export const API_BASE = 'https://api.planningcenteronline.com';
const base = () => yuri(API_BASE);

const people = '/people/v2';
export const me = () => `${people}/me`;
export const meUrl = () => base().pathname(me()).format();
export const person = id => `${people}/people/${id}`;
export const personUrl = id => base().pathname(person(id)).format();
export const peopleUrl = args => base()
  .pathname(`${people}/people`).search(qs.stringify(args)).format();

const services = '/services/v2';
export const serviceTypesUrl = () => base().pathname(`${services}/service_types`).format();
export const serviceTypeUrl = id => base().pathname(`${services}/service_types/${id}`).format();
