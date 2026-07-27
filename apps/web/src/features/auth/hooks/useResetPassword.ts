import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "../api/resetPassword";
import { updateIdentityCache } from "../utils/updateIdentityCache";

export function useResetPassword() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: resetPassword,
		onSuccess: () => updateIdentityCache(queryClient, { user: null }),
	});
}
