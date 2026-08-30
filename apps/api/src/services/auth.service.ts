import type { AuthUserType, AuthUserView } from "@app/shared";
import { env } from "../config/env";
import { UserModel } from "../models/user.model";

const ACTIVITY_THROTTLE_MS = 24 * 60 * 60 * 1000;

export async function createGuestUser() {
	return UserModel.create({ type: "guest" });
}

export async function getUserById(userId: string) {
	return UserModel.findById(userId);
}

export async function touchGuestActivity(userId: string) {
	await UserModel.updateOne(
		{
			_id: userId,
			type: "guest",
			lastActiveAt: { $lt: new Date(Date.now() - ACTIVITY_THROTTLE_MS) },
		},
		{ $set: { lastActiveAt: new Date() } },
	);
}

export function toAuthUserView(user: {
	_id: unknown;
	type: AuthUserType;
	displayName?: string | null;
	email?: string | null;
}): AuthUserView {
	return {
		id: String(user._id),
		type: user.type,
		displayName: user.displayName ?? null,
		email: user.email ?? null,
		isAdmin: isAdminUser(user),
	};
}

export function isAdminUser(user: { type: AuthUserType; email?: string | null }): boolean {
	return user.type === "registered" && Boolean(env.ADMIN_EMAIL) && user.email === env.ADMIN_EMAIL;
}
