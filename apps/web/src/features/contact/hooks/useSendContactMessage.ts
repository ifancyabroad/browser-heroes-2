import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "../api/sendContactMessage";

export function useSendContactMessage() {
	return useMutation({ mutationFn: sendContactMessage });
}
