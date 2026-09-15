import type { RunView } from "@app/shared";
import { Crown } from "pixelarticons/react/Crown";
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
	const leader = challenge?.leader;
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

				{leader ? (
					<div className="flex min-w-0 items-center justify-center gap-2 text-center">
						<span
							role="img"
							aria-label="Current leader"
							title="Current leader"
							className="shrink-0 text-primary"
						>
							<Crown aria-hidden="true" className="h-4 w-4" />
						</span>
						<span
							className="min-w-0 truncate"
							title={`${leader.heroName}${leader.displayName ? ` (${leader.displayName})` : ""}`}
						>
							<span
								className={
									leader.isCurrentUser ? "text-primary" : "text-text-bright"
								}
							>
								{leader.heroName}
							</span>
							{leader.displayName && (
								<span className="text-info"> ({leader.displayName})</span>
							)}
						</span>
						<span aria-hidden="true" className="shrink-0 text-text-muted">
							/
						</span>
						<span className="shrink-0 tabular-nums text-text-bright">
							{leader.kills} {leader.kills === 1 ? "KILL" : "KILLS"}
						</span>
					</div>
				) : (
					<p className="text-center text-text-muted">
						Be the first to finish today’s challenge.
					</p>
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
