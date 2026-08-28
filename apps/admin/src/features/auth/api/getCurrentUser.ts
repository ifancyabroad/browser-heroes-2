import type { AuthUserResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getCurrentUser(signal?: AbortSignal) {
	return api.get("auth/me", { signal }).json<AuthUserResponse>();
}
