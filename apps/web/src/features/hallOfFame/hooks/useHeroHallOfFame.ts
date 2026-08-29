import type { GetHeroHallOfFameQuery } from "@app/shared";
import { useQuery } from "@tanstack/react-query";
import { getHeroHallOfFame } from "../api/getHeroHallOfFame";
import { hallOfFameKeys } from "../api/hallOfFameKeys";

export function useHeroHallOfFame(query: GetHeroHallOfFameQuery, enabled: boolean) {
	return useQuery({
		queryKey: hallOfFameKeys.heroes(query),
		queryFn: ({ signal }) => getHeroHallOfFame(query, signal),
		enabled,
		meta: { errorMessage: "Unable to load the Hall of Fame. Please try again later." },
	});
}
