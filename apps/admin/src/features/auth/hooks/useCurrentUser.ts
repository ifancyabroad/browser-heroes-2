import { useQuery } from "@tanstack/react-query";
import { authKeys } from "../api/authKeys";
import { getCurrentUser } from "../api/getCurrentUser";

export function useCurrentUser() {
	return useQuery({
		queryKey: authKeys.currentUser(),
		queryFn: ({ signal }) => getCurrentUser(signal),
		retry: false,
	});
}
