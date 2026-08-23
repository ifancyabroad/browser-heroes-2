import { ButtonLink } from "../../../components/Button";
import { useDailyChallengeSummary } from "../hooks/useDailyChallengeSummary";

type DailyChallengeResultProps = {
	date: string;
	outcome: "dead" | "retired";
};

export function DailyChallengeResult({ date, outcome }: DailyChallengeResultProps) {
	const summary = useDailyChallengeSummary(date);
	const rank = summary.data?.challenge.attempt?.rankedEntry?.rank;
	const resultCopy = getResultCopy({ isPending: summary.isPending, rank, outcome });

	return (
		<section
			className="grid justify-items-center gap-3 text-center"
			aria-labelledby="daily-challenge-result-heading"
		>
			<div className="flex w-full items-center gap-3">
				<span className="h-0.5 flex-1 bg-border-secondary" aria-hidden="true" />
				<h2 id="daily-challenge-result-heading" className="shrink-0 text-text-bright">
					DAILY CHALLENGE COMPLETE
				</h2>
				<span className="h-0.5 flex-1 bg-border-secondary" aria-hidden="true" />
			</div>
			<p className="text-text">
				{resultCopy.beforeRank}
				{rank && <span className="tabular-nums text-primary">#{rank}</span>}
				{resultCopy.afterRank}
			</p>
			<ButtonLink to={`/daily-challenge?date=${date}`}>View leaderboard</ButtonLink>
			<span className="mt-1 h-0.5 w-full bg-border-secondary" aria-hidden="true" />
		</section>
	);
}

type ResultCopyInput = {
	isPending: boolean;
	rank: number | undefined;
	outcome: DailyChallengeResultProps["outcome"];
};

function getResultCopy({ isPending, rank, outcome }: ResultCopyInput) {
	if (rank) {
		return {
			beforeRank: "You currently rank ",
			afterRank:
				outcome === "retired"
					? ". A triumphant challenge run."
					: ". A worthy attempt in the dungeon.",
		};
	}

	return {
		beforeRank: isPending ? "Your rank is being calculated..." : "Your attempt is recorded.",
		afterRank: "",
	};
}
