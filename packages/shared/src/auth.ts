import { z } from "zod";

export const DISPLAY_NAME_MIN_LENGTH = 2;
export const DISPLAY_NAME_MAX_LENGTH = 32;
export const ACCOUNT_PASSWORD_MIN_LENGTH = 10;
export const ACCOUNT_PASSWORD_MAX_LENGTH = 128;

const emailSchema = z.string().trim().max(254).pipe(z.email());
const passwordSchema = z.string().min(ACCOUNT_PASSWORD_MIN_LENGTH).max(ACCOUNT_PASSWORD_MAX_LENGTH);
const tokenSchema = z.string().min(1);

export const registerBodySchema = z.object({
	displayName: z.string().trim().min(DISPLAY_NAME_MIN_LENGTH).max(DISPLAY_NAME_MAX_LENGTH),
	email: emailSchema,
	password: passwordSchema,
});

export const loginBodySchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const emailBodySchema = z.object({
	email: emailSchema,
});

export const resetPasswordBodySchema = z.object({
	token: tokenSchema,
	password: passwordSchema,
});

export type AuthUserType = "guest" | "registered";

export interface AuthUserView {
	id: string;
	type: AuthUserType;
	displayName: string | null;
	email: string | null;
	isAdmin: boolean;
}

export interface AuthUserResponse {
	user: AuthUserView | null;
}

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;

export type EmailBody = z.infer<typeof emailBodySchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordBodySchema>;

export interface MessageResponse {
	message: string;
}
