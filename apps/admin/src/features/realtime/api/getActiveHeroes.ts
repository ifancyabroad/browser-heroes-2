import type { AdminActiveHeroesResponse, RunMode } from "@app/shared";
import { api } from "../../../lib/api";

export function getActiveHeroes(mode: RunMode | "all", signal?: AbortSignal) {
	return api
		.get("admin/realtime/heroes", {
			signal,
			searchParams: mode === "all" ? {} : { mode },
		})
		.json<AdminActiveHeroesResponse>();
}
