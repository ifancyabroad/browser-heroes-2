import type { AdminActivityResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getActivity(signal?: AbortSignal) {
	return api.get("admin/realtime/activity", { signal }).json<AdminActivityResponse>();
}
