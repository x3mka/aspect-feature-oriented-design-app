import auth0 from 'auth0-js';
import store from 'store';
import decode from 'jwt-decode';


class AuthService {
  constructor(options = {}) {
    this.accessTokenKey = options.accessTokenKey || 'access_token';
    this.profileKey = options.profileKey || 'user_profile';

    this.logoutUrl = options.logoutUrl || 'http://localhost:9000';

    this.auth0params = options.auth0 || {};
    this.auth0params.responseType = this.auth0params.responseType || 'token';
    this.auth0params.scope = this.auth0params.scope || 'openid profile email';

    this.auth0 = new auth0.WebAuth(this.auth0params);
    this.store = store;

    this.getAccessToken = this.getAccessToken.bind(this);
    this.setAccessToken = this.setAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.removeTokens = this.removeTokens.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  getAccessToken() {
    return this.store.get(this.accessTokenKey);
  }

  setAccessToken(token) {
    this.store.set(this.accessTokenKey, token);
  }

  getProfile() {
    return this.store.get(this.profileKey);
  }

  setProfile(profile) {
    this.store.set(this.profileKey, profile);
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    this.removeTokens();
    this.auth0.logout({
      returnTo: this.logoutUrl,
      clientID: this.auth0params.clientID
    });
  }

  removeTokens() {
    this.store.remove(this.accessTokenKey);
    this.store.remove(this.profileKey);
  }

  isAuthenticated() {
    const token = this.getAccessToken();

    if (!token) {
      return false;
    }

    return (Date.now() / 1000) <= decode(token).exp;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      if (this.isAuthenticated()) {
        resolve();
        return;
      }

      this.auth0.parseHash((err, authResult) => {
        if (err) {
          reject(err);
          return;
        }

        const { accessToken } = authResult;
        this.setAccessToken(accessToken);

        this.auth0.client.userInfo(accessToken, (err, user) => {
          if (err) {
            reject(err);
            return;
          }

          this.setProfile(user);
          resolve(user);
        });
      });
    });
  }
}

export default AuthService;
