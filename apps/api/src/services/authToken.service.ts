import { createHash, randomBytes } from "node:crypto";
import type { Types } from "mongoose";
import { AuthTokenModel } from "../models/authToken.model";

export type AuthTokenPurpose = "reset-password";

function tokenHash(token: string) {
	return createHash("sha256").update(token).digest("hex");
}

export async function issueAuthToken(input: {
	userId: Types.ObjectId;
	purpose: AuthTokenPurpose;
	lifetimeMs: number;
}) {
	const token = randomBytes(32).toString("base64url");

	await AuthTokenModel.create({
		...input,
		tokenHash: tokenHash(token),
		expiresAt: new Date(Date.now() + input.lifetimeMs),
	});

	return token;
}

export function consumeAuthToken(token: string, purpose: AuthTokenPurpose) {
	return AuthTokenModel.findOneAndUpdate(
		{
			tokenHash: tokenHash(token),
			purpose,
			usedAt: null,
			expiresAt: { $gt: new Date() },
		},
		{ $set: { usedAt: new Date() } },
		{ returnDocument: "after" },
	);
}

export function deleteUnusedAuthTokens(userId: Types.ObjectId, purpose: AuthTokenPurpose) {
	return AuthTokenModel.deleteMany({ userId, purpose, usedAt: null });
}
