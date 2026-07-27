import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";
import { updateIdentityCache } from "../utils/updateIdentityCache";

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => updateIdentityCache(queryClient, { user: data.user }),
	});
}
