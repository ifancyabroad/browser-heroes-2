import type { GetWorldLogResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getWorldLog(signal?: AbortSignal) {
	return api.get("world-log", { signal }).json<GetWorldLogResponse>();
}
