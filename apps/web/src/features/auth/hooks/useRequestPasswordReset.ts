import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../api/requestPasswordReset";

export function useRequestPasswordReset() {
	return useMutation({ mutationFn: requestPasswordReset });
}
