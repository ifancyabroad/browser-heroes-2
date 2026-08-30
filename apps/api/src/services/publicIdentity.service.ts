import { UserModel } from "../models/user.model";

export async function getRegisteredDisplayNames(userIds: unknown[]): Promise<Map<string, string>> {
	const uniqueUserIds = [...new Set(userIds.filter(Boolean).map(String))];
	if (uniqueUserIds.length === 0) {
		return new Map();
	}

	const users = await UserModel.find({
		_id: { $in: uniqueUserIds },
		type: "registered",
	})
		.select("_id displayName")
		.lean();

	return new Map(
		users.flatMap((user) => {
			const displayName = user.displayName?.trim();
			return displayName ? [[String(user._id), displayName] as const] : [];
		}),
	);
}

export async function getRegisteredDisplayName(userId: unknown): Promise<string | null> {
	const displayNames = await getRegisteredDisplayNames([userId]);
	return displayNames.get(String(userId)) ?? null;
}
