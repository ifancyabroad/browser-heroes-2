import type { GetRunStatsQuery } from "@app/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRunStats } from "../api/getRunStats";
import { statsKeys } from "../api/statsKeys";

export function useRunStats(query: GetRunStatsQuery, enabled: boolean) {
	return useQuery({
		queryKey: statsKeys.runs(query),
		queryFn: ({ signal }) => getRunStats(query, signal),
		placeholderData: keepPreviousData,
		enabled,
		meta: { errorMessage: "Unable to load hero stats. Please try again later." },
	});
}
