import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout";
import { updateIdentityCache } from "../utils/updateIdentityCache";

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => updateIdentityCache(queryClient, { user: null }),
	});
}
