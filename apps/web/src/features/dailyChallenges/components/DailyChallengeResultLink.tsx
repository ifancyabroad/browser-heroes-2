import { ButtonLink } from "../../../components/Button";
import { useDailyChallengeSummary } from "../hooks/useDailyChallengeSummary";

export function DailyChallengeResultLink({ date }: { date: string }) {
	const summary = useDailyChallengeSummary(date);
	const rank = summary.data?.challenge.attempt?.rankedEntry?.rank;

	return (
		<ButtonLink to={`/daily-challenge?date=${date}`}>
			{rank ? `VIEW LEADERBOARD · RANK ${rank}` : "VIEW LEADERBOARD"}
		</ButtonLink>
	);
}
