import type { AuthUserResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function createGuestSession() {
	return api.post("auth/guest").json<AuthUserResponse>();
}
