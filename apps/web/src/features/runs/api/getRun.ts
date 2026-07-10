import type { GetRunResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getRun(runId: string, signal?: AbortSignal) {
	return api.get(`runs/${runId}`, { signal }).json<GetRunResponse>();
}
