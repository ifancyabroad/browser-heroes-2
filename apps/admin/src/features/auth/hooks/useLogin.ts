import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "../api/authKeys";
import { login } from "../api/login";

export function useLogin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: login,
		onSuccess: (data) => queryClient.setQueryData(authKeys.currentUser(), data),
	});
}
