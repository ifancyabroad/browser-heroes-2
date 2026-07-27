import argon2 from "argon2";
import { ACCOUNT_PASSWORD_MAX_LENGTH, ACCOUNT_PASSWORD_MIN_LENGTH } from "@app/shared";

export const MIN_PASSWORD_LENGTH = ACCOUNT_PASSWORD_MIN_LENGTH;
export const MAX_PASSWORD_LENGTH = ACCOUNT_PASSWORD_MAX_LENGTH;

export function hashPassword(password: string) {
	return argon2.hash(password, { type: argon2.argon2id });
}

export function verifyPassword(passwordHash: string, password: string) {
	return argon2.verify(passwordHash, password);
}
