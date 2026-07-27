import type { AuthUserResponse, RegisterBody } from "@app/shared";
import { api } from "../../../lib/api";

export function registerAccount(body: RegisterBody) {
	return api.post("auth/register", { json: body }).json<AuthUserResponse>();
}
