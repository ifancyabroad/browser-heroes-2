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
	const challenge = summary.data?.challenge;
	const isLoading = summary.isPending;
	const isUnavailable = summary.isError || (!isLoading && !challenge);
	const isContentHidden = isLoading || isUnavailable;

	return (
		<Card className="w-full p-4">
			{isContentHidden && (
				<h2
					className={`absolute inset-0 flex items-center justify-center ${isUnavailable ? "text-error" : "text-text-muted"}`}
				>
					{isUnavailable ? "Daily Challenge unavailable." : "Loading Daily Challenge..."}
				</h2>
			)}

			<div
				className={`grid gap-3 ${isContentHidden ? "invisible" : ""}`}
				aria-hidden={isContentHidden}
			>
				<h2 className="text-primary">
					{activeDailyRun ? "DAILY CHALLENGE IN PROGRESS" : "DAILY CHALLENGE"}
				</h2>
				<p className="text-text">
					Everyone faces the same adventure with the same hero class. One attempt. How far
					can you get?
				</p>

				{!activeDailyRun && (
					<div className="flex justify-center gap-5 tabular-nums text-text-bright">
						<span>
							{challenge?.attemptCount ?? 0}{" "}
							{challenge?.attemptCount === 1 ? "ATTEMPT" : "ATTEMPTS"}
						</span>
						<span>
							{challenge?.leader
								? `BEST ${challenge.leader.kills} ${challenge.leader.kills === 1 ? "KILL" : "KILLS"}`
								: "NO FINISHES YET"}
						</span>
					</div>
				)}

				{isContentHidden ? (
					<div className="min-h-9 border-2 px-3 py-1">
						{activeDailyRun ? "CONTINUE DAILY CHALLENGE" : "START DAILY CHALLENGE"}
					</div>
				) : activeDailyRun ? (
					<ButtonLink variant="primary" to="/game">
						CONTINUE DAILY CHALLENGE
					</ButtonLink>
				) : challenge?.canStart ? (
					<DailyChallengeStartButton currentRun={currentRun} />
				) : (
					<ButtonLink variant="primary" to="/daily-challenge">
						VIEW RESULTS
					</ButtonLink>
				)}
			</div>
		</Card>
	);
}
