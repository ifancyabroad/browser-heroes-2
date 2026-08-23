import type { GetChallengeSummaryResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getDailyChallengeSummary(date: string, signal?: AbortSignal) {
	return api.get(`daily-challenges/${date}`, { signal }).json<GetChallengeSummaryResponse>();
}
