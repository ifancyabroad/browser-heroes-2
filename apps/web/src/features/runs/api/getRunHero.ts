import type { GetRunHeroResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getRunHero(runId: string, signal?: AbortSignal) {
	return api.get(`runs/${runId}/hero`, { signal }).json<GetRunHeroResponse>();
}
