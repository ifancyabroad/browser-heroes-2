import type { GetRunResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getCurrentRun(signal?: AbortSignal) {
	return api.get("runs/current", { signal }).json<GetRunResponse>();
}
