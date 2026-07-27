import type { AuthUserResponse, LoginBody } from "@app/shared";
import { api } from "../../../lib/api";

export function login(body: LoginBody) {
	return api.post("auth/login", { json: body }).json<AuthUserResponse>();
}
