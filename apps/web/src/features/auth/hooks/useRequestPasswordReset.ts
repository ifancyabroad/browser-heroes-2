import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../api/requestPasswordReset";

export function useRequestPasswordReset() {
	return useMutation({
		mutationFn: requestPasswordReset,
		meta: { errorMessage: "Unable to request a reset email. Please try again later." },
	});
}
