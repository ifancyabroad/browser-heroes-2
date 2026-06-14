import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "../api/authKeys";
import { createGuestSession } from "../api/createGuestSession";

export function useCreateGuestSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createGuestSession,
		onSuccess: (data) => {
			queryClient.setQueryData(authKeys.currentUser(), data);
		},
	});
}
