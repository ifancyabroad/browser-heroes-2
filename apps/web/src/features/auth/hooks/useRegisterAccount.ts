import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AuthUserResponse } from "@app/shared";
import { createGuestSession } from "../api/createGuestSession";
import { registerAccount } from "../api/registerAccount";
import { authKeys } from "../api/authKeys";
import { updateIdentityCache } from "../utils/updateIdentityCache";

export function useRegisterAccount() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (body: Parameters<typeof registerAccount>[0]) => {
			const current = queryClient.getQueryData<AuthUserResponse>(authKeys.currentUser());

			if (!current?.user) {
				await createGuestSession();
			}

			return registerAccount(body);
		},
		onSuccess: (data) => updateIdentityCache(queryClient, data),
	});
}
