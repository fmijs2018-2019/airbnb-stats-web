import * as auth0 from 'auth0-js';
import { Auth0DecodedHash, AuthorizeOptions } from 'auth0-js';

export const clientBaseUrl = 'http://localhost:3000';

class Auth {
	auth0: auth0.WebAuth;

	constructor() {
		this.auth0 = new auth0.WebAuth({
			// the following three lines MUST be updated
			domain: 'airbnb-stats.eu.auth0.com',
			audience: 'https://airbnb-stats.eu.auth0.com/userinfo',
			clientID: 'jz1zd7BI5Lx5UjcU3Ua62XkVPqvZOuND',
			redirectUri:  clientBaseUrl + '/callback',
			responseType: 'token id_token',
    		scope: 'openid profile email'
		});

		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	signIn(authOptions?: AuthorizeOptions) {
		this.auth0.authorize(authOptions);
	}

	handleAuthentication(): Promise<Auth0DecodedHash> {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if (err) {
					return reject(err);
				}
				if (!authResult || !authResult.idToken) {
					return reject(err);
				}
				resolve(authResult);
			});
		})
	}

	signOut() {
		this.auth0.logout({
			returnTo: clientBaseUrl,
			clientID: 'jz1zd7BI5Lx5UjcU3Ua62XkVPqvZOuND',
		});
	}

	silentAuth(): Promise<Auth0DecodedHash> {
		return new Promise((resolve, reject) => {
			this.auth0.checkSession({}, (err, authResult) => {
				if (err) {
					return reject(err);
				}

				resolve(authResult);
			});
		});
	}
}

const auth0Client = new Auth();

export default auth0Client;