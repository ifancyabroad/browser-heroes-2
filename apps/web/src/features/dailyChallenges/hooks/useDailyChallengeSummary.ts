import { useQuery } from "@tanstack/react-query";
import { dailyChallengeKeys } from "../api/dailyChallengeKeys";
import { getDailyChallengeSummary } from "../api/getDailyChallengeSummary";

export function useDailyChallengeSummary(date: string) {
	return useQuery({
		queryKey: dailyChallengeKeys.summary(date),
		queryFn: ({ signal }) => getDailyChallengeSummary(date, signal),
		meta: { errorMessage: "Unable to load the Daily Challenge. Please try again later." },
	});
}
