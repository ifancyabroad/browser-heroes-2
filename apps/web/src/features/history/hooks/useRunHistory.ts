import type { GetRunHistoryQuery } from "@app/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRunHistory } from "../api/getRunHistory";
import { historyKeys } from "../api/historyKeys";

export function useRunHistory(query: GetRunHistoryQuery, enabled: boolean) {
	return useQuery({
		queryKey: historyKeys.runs(query),
		queryFn: ({ signal }) => getRunHistory(query, signal),
		placeholderData: keepPreviousData,
		enabled,
		meta: { errorMessage: "Unable to load hero history. Please try again later." },
	});
}
