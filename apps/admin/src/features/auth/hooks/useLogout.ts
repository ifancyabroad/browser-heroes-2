import type { AuthUserResponse } from "@app/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "../api/authKeys";
import { logout } from "../api/logout";

export function useLogout() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: logout,
		onSuccess: () =>
			queryClient.setQueryData<AuthUserResponse>(authKeys.currentUser(), { user: null }),
	});
}
