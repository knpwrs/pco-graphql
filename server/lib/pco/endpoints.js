import yuri from 'yuri';

export const API_BASE = 'https://api.planningcenteronline.com';
const base = () => yuri(API_BASE);

const people = '/people/v2';
export const me = () => `${people}/me`;
export const meUrl = () => base().pathname(me()).format();
export const person = id => `${people}/people/${id}`;
export const personUrl = id => base().pathname(person(id)).format();
