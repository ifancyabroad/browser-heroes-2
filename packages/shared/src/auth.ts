export type AuthUserType = "guest" | "registered";

export interface AuthUserView {
	id: string;
	type: AuthUserType;
	displayName: string | null;
	email: string | null;
}

export interface AuthUserResponse {
	user: AuthUserView | null;
}
