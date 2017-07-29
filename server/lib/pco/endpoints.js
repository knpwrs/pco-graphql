import yuri from 'yuri';

export const API_BASE = 'https://api.planningcenteronline.com/';

const people = '/people/v2';
export const me = () => `${people}/me`;
export const meUrl = () => yuri(API_BASE).pathname(me()).format();
