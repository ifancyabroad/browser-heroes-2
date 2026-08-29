import type { GetGhostHallOfFameQuery, GetGhostHallOfFameResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getGhostHallOfFame(query: GetGhostHallOfFameQuery, signal?: AbortSignal) {
	return api
		.get("hall-of-fame/ghosts", { signal, searchParams: query })
		.json<GetGhostHallOfFameResponse>();
}
