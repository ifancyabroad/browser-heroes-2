import { useCurrentUser } from "./useCurrentUser";

export function useAuth() {
	const currentUser = useCurrentUser();
	const user = currentUser.data?.user ?? null;

	return {
		...currentUser,
		user,
		hasSession: Boolean(user),
		isRegistered: user?.type === "registered",
		isGuest: user?.type === "guest",
	};
}
