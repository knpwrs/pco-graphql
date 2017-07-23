import OAuth2Strategy from 'passport-oauth2';
import fetch from './fetch-with-token';

// The url to get the user's profile
const profileUrl = 'https://api.planningcenteronline.com/people/v2/me';
// The following are camcelcased according to what passport expects
const authorizationURL = 'https://api.planningcenteronline.com/oauth/authorize';
const tokenURL = 'https://api.planningcenteronline.com/oauth/token';

export default class PcoStrategy extends OAuth2Strategy {
  constructor(options = {}, verify) {
    const ops = Object.assign({}, {
      authorizationURL,
      tokenURL,
    }, options);
    super(ops, verify);
    this.name = 'pco';
  }

  /* eslint-disable class-methods-use-this */
  async userProfile(accessToken, done) {
    const res = await fetch(profileUrl, accessToken);
    done(null, await res.json());
  }
  /* eslint-enable class-methods-use-this */
}
