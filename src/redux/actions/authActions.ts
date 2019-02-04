import { IApplicationState } from "../store";
import auth0Client from 'src/Auth';
import { Dispatch } from 'redux';
import { AuthorizeOptions, Auth0DecodedHash } from 'auth0-js';
import { IReduxAction } from 'src/models/ReduxAction';

//selectors
export const isAuthenticated = (state: IApplicationState): boolean => {
    const exp = state.auth.expiresAt;
    const token = state.auth.idToken;
    return (token && exp) ? new Date().getTime() < exp: false;
}

export const SILENT_AUTH_START = 'SILENT_AUTH_START';
export const SILENT_AUTH_END = 'SILENT_AUTH_END';
export const SILENT_AUTH_SUCCESS = 'SILENT_AUTH_SUCCESS';
export const SILENT_AUTH_ERROR = 'SILENT_AUTH_ERROR';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';

export const REDIRECT_TO_AUTH0 = 'REDIRECT_TO_AUTH0';

//actions
export const handleAuthentication = () => {
    return function (dispatch: Dispatch): Promise<Auth0DecodedHash> {
        const promise = auth0Client.handleAuthentication();

        promise
            .then((data: Auth0DecodedHash) => {
                dispatch(authSuccess(data));
            })
            .catch((error) => {
                dispatch(authError(error));
            });

        return promise;
    }
}

export const silentAuth = () => {
    return function (dispatch: Dispatch): Promise<Auth0DecodedHash> {
        dispatch(silentAuthStart());
        const promise = auth0Client.silentAuth();

        promise
            .then((data: Auth0DecodedHash) => {
                dispatch(silentAuthSuccess(data));
                dispatch(silentAuthEnd());
            })
            .catch((error) => {
                dispatch(silentAuthError(error));
                dispatch(silentAuthEnd());
            });

        return promise;
    }
}

export const silentAuthStart = (): IReduxAction => ({ type: SILENT_AUTH_START });
export const silentAuthEnd = (): IReduxAction => ({ type: SILENT_AUTH_END });

export const clearAuthState = (): IReduxAction => {
    return { type: SIGN_OUT_SUCCESS };
};

export const authError = (error: any): IReduxAction => ({
    type: AUTH_ERROR,
    payload: error,
});

export const authSuccess = (data: Auth0DecodedHash) => ({
    type: AUTH_SUCCESS,
    payload: data,
});

export const silentAuthError = (error: any): IReduxAction => ({
    type: SILENT_AUTH_ERROR,
    payload: error,
});

export const silentAuthSuccess = (data: Auth0DecodedHash) => ({
    type: SILENT_AUTH_SUCCESS,
    payload: data,
});