import type { GetGhostHistoryQuery } from "@app/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGhostHistory } from "../api/getGhostHistory";
import { historyKeys } from "../api/historyKeys";

export function useGhostHistory(query: GetGhostHistoryQuery, enabled: boolean) {
	return useQuery({
		queryKey: historyKeys.ghosts(query),
		queryFn: ({ signal }) => getGhostHistory(query, signal),
		placeholderData: keepPreviousData,
		enabled,
		meta: { errorMessage: "Unable to load ghost history. Please try again later." },
	});
}
