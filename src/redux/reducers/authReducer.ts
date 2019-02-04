
import { IReduxAction } from 'src/models/ReduxAction';
import { IAuthState, initialAuthState } from '../state/authState';
import { AUTH_SUCCESS, AUTH_ERROR, SIGN_OUT_SUCCESS, SILENT_AUTH_END, SILENT_AUTH_START, SILENT_AUTH_ERROR, SILENT_AUTH_SUCCESS, isAuthenticated } from '../actions/authActions';

export const authReducer = (state: IAuthState = initialAuthState, action: IReduxAction): IAuthState => {
    switch (action.type) {
        case AUTH_SUCCESS:
        case SILENT_AUTH_SUCCESS:
            const { idToken, idTokenPayload, appState, expiresIn, accessToken } = action.payload;
            const expiresAt = (expiresIn * 1000) + new Date().getTime();
            return { ...state, authError: null, idToken: idToken, idTokenPayload, appState, expiresAt, accessToken };
        case AUTH_ERROR:
        case SILENT_AUTH_ERROR:
            return { ...state, authError: action.payload, idToken: undefined, expiresAt: undefined, idTokenPayload: undefined };
        case SIGN_OUT_SUCCESS:
            return { ...state, authError: undefined, idToken: undefined, expiresAt: undefined, idTokenPayload: undefined };
        case SILENT_AUTH_END:
            return { ...state, silentAuthInProgress: false };
        case SILENT_AUTH_START:
            return { ...state, silentAuthInProgress: true };
    }

    return state;
}