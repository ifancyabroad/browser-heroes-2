import type { EmailBody, MessageResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function requestPasswordReset(body: EmailBody) {
	return api.post("auth/forgot-password", { json: body }).json<MessageResponse>();
}
