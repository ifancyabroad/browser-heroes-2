import type { GetUserStatsSummaryResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getStatsSummary(signal?: AbortSignal) {
	return api.get("stats/summary", { signal }).json<GetUserStatsSummaryResponse>();
}
