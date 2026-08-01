import type { GetGhostStatsQuery } from "@app/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGhostStats } from "../api/getGhostStats";
import { statsKeys } from "../api/statsKeys";

export function useGhostStats(query: GetGhostStatsQuery, enabled: boolean) {
	return useQuery({
		queryKey: statsKeys.ghosts(query),
		queryFn: ({ signal }) => getGhostStats(query, signal),
		placeholderData: keepPreviousData,
		enabled,
		meta: { errorMessage: "Unable to load ghost stats. Please try again later." },
	});
}
