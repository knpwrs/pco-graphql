import yuri from 'yuri';
import fetch from './fetch';

export const API_BASE = 'https://api.planningcenteronline.com/';

const profileUrl = yuri(API_BASE).pathname('people/v2/me').format();

export const getProfile = async ({ accessToken }) => fetch(accessToken, profileUrl);
