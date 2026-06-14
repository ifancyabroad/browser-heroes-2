import type { AuthUserType, AuthUserView } from "@app/shared";
import { UserModel } from "../models/user.model";

export async function createGuestUser() {
	const user = await UserModel.create({
		type: "guest",
	});

	return user;
}

export async function getUserById(userId: string) {
	return UserModel.findById(userId);
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
	};
}
