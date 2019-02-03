import * as auth0 from 'auth0-js';
import { Auth0DecodedHash, AuthorizeOptions } from 'auth0-js';

class Auth {
    idTokenPayload?: any;
    auth0: auth0.WebAuth;
    idToken?: string;
    expiresAt?: number;
    appState?: any;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'airbnb-stats.eu.auth0.com',
      audience: 'https://airbnb-stats.eu.auth0.com/userinfo',
      clientID: 'jz1zd7BI5Lx5UjcU3Ua62XkVPqvZOuND',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.idTokenPayload;
  }

  getAppState() {
    return this.appState;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    console.log(this.idToken, this.expiresAt)
    return this.expiresAt ? new Date().getTime() < this.expiresAt : false;
  }

  signIn(authOptions?: AuthorizeOptions) {
    this.auth0.authorize(authOptions);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession(authResult: Auth0DecodedHash) {
    this.idToken = authResult.idToken;
    this.idTokenPayload = authResult.idTokenPayload;
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
    this.appState = authResult.appState;
    
    console.log(authResult);
  }

  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'jz1zd7BI5Lx5UjcU3Ua62XkVPqvZOuND',
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;