
export interface IProfilePayload {
	name?: string;
	email?: string;
	picture?: string;
	//claims
	sub?: string;
	iss?: string;
	aud?: string;
	exp?: number;
	iat?: number;
}