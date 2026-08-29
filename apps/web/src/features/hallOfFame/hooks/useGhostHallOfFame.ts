import type { GetGhostHallOfFameQuery } from "@app/shared";
import { useQuery } from "@tanstack/react-query";
import { getGhostHallOfFame } from "../api/getGhostHallOfFame";
import { hallOfFameKeys } from "../api/hallOfFameKeys";

export function useGhostHallOfFame(query: GetGhostHallOfFameQuery, enabled: boolean) {
	return useQuery({
		queryKey: hallOfFameKeys.ghosts(query),
		queryFn: ({ signal }) => getGhostHallOfFame(query, signal),
		enabled,
		meta: { errorMessage: "Unable to load the Hall of Fame. Please try again later." },
	});
}
