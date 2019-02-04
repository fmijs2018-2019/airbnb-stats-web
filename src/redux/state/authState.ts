import { IProfilePayload } from 'src/models/auth/IProfilePayload';


export interface IAuthState {
    idToken?: string;
    accessToken?: string;
    idTokenPayload?: IProfilePayload;
    expiresAt?: number;
    appState?: any;
    silentAuthInProgress: boolean;
    authError?: any;
}

export const initialAuthState: IAuthState = {
    silentAuthInProgress: true
};