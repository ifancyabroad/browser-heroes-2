import { CLASSES_BY_ID } from "@app/content";
import type { RunView } from "@app/shared";
import { ButtonLink } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { getTodayUtc } from "../../../utils/date";
import { useDailyChallengeSummary } from "../hooks/useDailyChallengeSummary";
import { DailyChallengeStartButton } from "./DailyChallengeStartButton";

export function DailyChallengeLandingPanel({ currentRun }: { currentRun: RunView | null }) {
	const today = getTodayUtc();
	const summary = useDailyChallengeSummary(today);
	const activeDailyRun = currentRun?.mode === "dailyChallenge" ? currentRun : null;

	if (summary.isPending) {
		return (
			<Card className="w-full border-primary p-4 text-text-muted">
				Loading Daily Challenge...
			</Card>
		);
	}

	if (summary.isError || !summary.data) {
		return (
			<Card className="w-full border-primary p-4 text-error">
				Daily Challenge unavailable.
			</Card>
		);
	}

	const challenge = summary.data.challenge;
	const classId = activeDailyRun?.summary.classId ?? challenge.classId;
	const date = activeDailyRun?.dailyChallengeDate ?? challenge.date;

	return (
		<Card className="grid w-full gap-3 border-primary p-4">
			<h2 className="text-primary">
				{activeDailyRun ? "DAILY CHALLENGE IN PROGRESS" : "DAILY CHALLENGE"}
			</h2>
			<p>
				{CLASSES_BY_ID[classId].name} · {date}
			</p>

			{!activeDailyRun && (
				<div className="flex justify-center gap-5 tabular-nums">
					<span>{challenge.attemptCount} ATTEMPTS</span>
					<span>
						{challenge.leader
							? `BEST ${challenge.leader.kills} KILLS`
							: "NO FINISHES YET"}
					</span>
				</div>
			)}

			{activeDailyRun ? (
				<ButtonLink variant="primary" to="/game">
					CONTINUE DAILY CHALLENGE
				</ButtonLink>
			) : challenge.canStart ? (
				<DailyChallengeStartButton classId={challenge.classId} />
			) : (
				<ButtonLink variant="primary" to="/daily-challenge">
					VIEW RESULTS
				</ButtonLink>
			)}
		</Card>
	);
}
