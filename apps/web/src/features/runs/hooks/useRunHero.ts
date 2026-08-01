import { useQuery } from "@tanstack/react-query";
import { getRunHero } from "../api/getRunHero";
import { runKeys } from "../api/runKeys";

export function useRunHero(runId: string | null) {
	return useQuery({
		queryKey: runKeys.hero(runId),
		queryFn: ({ signal }) => getRunHero(runId!, signal),
		enabled: Boolean(runId),
		meta: { errorMessage: "Unable to retrieve this hero. Please try again later." },
	});
}
