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
	type: "guest" | "registered";
	displayName?: string | null;
	email?: string | null;
}) {
	return {
		id: String(user._id),
		type: user.type,
		displayName: user.displayName ?? null,
		email: user.email ?? null,
	};
}
