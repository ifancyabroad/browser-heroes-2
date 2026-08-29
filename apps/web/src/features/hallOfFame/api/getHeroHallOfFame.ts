import type { GetHeroHallOfFameQuery, GetHeroHallOfFameResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getHeroHallOfFame(query: GetHeroHallOfFameQuery, signal?: AbortSignal) {
	return api
		.get("hall-of-fame/heroes", { signal, searchParams: query })
		.json<GetHeroHallOfFameResponse>();
}
