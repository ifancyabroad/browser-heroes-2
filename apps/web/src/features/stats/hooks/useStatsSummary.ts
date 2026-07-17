import { useQuery } from "@tanstack/react-query";
import { getStatsSummary } from "../api/getStatsSummary";
import { statsKeys } from "../api/statsKeys";

export function useStatsSummary(enabled: boolean) {
	return useQuery({
		queryKey: statsKeys.summary(),
		queryFn: ({ signal }) => getStatsSummary(signal),
		enabled,
	});
}
