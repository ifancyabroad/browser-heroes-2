import type { MessageResponse, ResetPasswordBody } from "@app/shared";
import { api } from "../../../lib/api";

export function resetPassword(body: ResetPasswordBody) {
	return api.post("auth/reset-password", { json: body }).json<MessageResponse>();
}
