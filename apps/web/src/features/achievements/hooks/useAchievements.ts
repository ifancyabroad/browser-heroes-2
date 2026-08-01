import { useQuery } from "@tanstack/react-query";
import { achievementKeys } from "../api/achievementKeys";
import { getAchievements } from "../api/getAchievements";

export function useAchievements(enabled: boolean) {
	return useQuery({
		queryKey: achievementKeys.unlocks(),
		queryFn: ({ signal }) => getAchievements(signal),
		enabled,
		meta: { errorMessage: "Unable to load achievements. Please try again later." },
	});
}
