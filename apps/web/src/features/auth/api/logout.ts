import type { MessageResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function logout() {
	return api.post("auth/logout").json<MessageResponse>();
}
