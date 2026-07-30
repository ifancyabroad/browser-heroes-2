import type { ContactBody, MessageResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function sendContactMessage(body: ContactBody) {
	return api.post("contact", { json: body }).json<MessageResponse>();
}
