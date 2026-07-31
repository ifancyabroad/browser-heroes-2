import type { GetAchievementsResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getAchievements(signal?: AbortSignal) {
	return api.get("achievements", { signal }).json<GetAchievementsResponse>();
}
