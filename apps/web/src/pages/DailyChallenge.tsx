import { CLASSES_BY_ID } from "@app/content";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, ButtonLink } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { TablePagination } from "../components/TablePagination";
import { DailyChallengeLeaderboardTable } from "../features/dailyChallenges/components/DailyChallengeLeaderboardTable";
import { DailyChallengeStartButton } from "../features/dailyChallenges/components/DailyChallengeStartButton";
import { useDailyChallengeLeaderboard } from "../features/dailyChallenges/hooks/useDailyChallengeLeaderboard";
import { useDailyChallengeSummary } from "../features/dailyChallenges/hooks/useDailyChallengeSummary";
import { HeroDossierModal } from "../features/heroDossier";
import { addUtcDays, formatDailyDate, getTodayUtc } from "../utils/date";

const PAGE_SIZE = 20;

export default function DailyChallenge() {
	const [searchParams] = useSearchParams();
	const [date, setDate] = useState(() => getInitialDate(searchParams.get("date")));
	const [page, setPage] = useState(1);
	const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

	const summary = useDailyChallengeSummary(date);
	const leaderboard = useDailyChallengeLeaderboard(date, { page, limit: PAGE_SIZE });
	const challenge = summary.data?.challenge;

	function changeDate(nextDate: string) {
		setDate(nextDate);
		setPage(1);
	}

	return (
		<PageLayout>
			<Header />
			<Container>
				<header className="mb-5 grid gap-2">
					<h1 className="text-primary">DAILY CHALLENGE</h1>
					<p>One attempt. One class. The same journey for everyone.</p>
				</header>

				<Card className="mb-4 grid gap-4 p-4">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<Button onClick={() => changeDate(addUtcDays(date, -1))}>PREVIOUS</Button>
						<div className="text-center">
							<p className="text-primary">{formatDailyDate(date)}</p>
							{challenge && <p>{CLASSES_BY_ID[challenge.classId].name}</p>}
						</div>
						<Button
							disabled={date === getTodayUtc()}
							onClick={() => changeDate(addUtcDays(date, 1))}
						>
							NEXT
						</Button>
					</div>

					{summary.isPending ? (
						<p className="text-center text-text-muted">Loading challenge...</p>
					) : summary.isError || !challenge ? (
						<p className="text-center text-error">Unable to load this challenge.</p>
					) : (
						<div className="flex flex-wrap items-center justify-center gap-5 text-center tabular-nums">
							<p>{challenge.attemptCount} ATTEMPTS</p>
							<p>
								{challenge.leader
									? `BEST: ${challenge.leader.kills} KILLS · DAY ${challenge.leader.day}`
									: "NO COMPLETED ATTEMPTS"}
							</p>
							{challenge.canStart && (
								<DailyChallengeStartButton
									classId={challenge.classId}
									label="START CHALLENGE"
								/>
							)}
							{challenge.attempt?.status === "active" && (
								<ButtonLink variant="primary" to="/game">
									CONTINUE CHALLENGE
								</ButtonLink>
							)}
							{challenge.attempt && challenge.attempt.status !== "active" && (
								<p className="text-text-muted">ATTEMPT COMPLETE</p>
							)}
						</div>
					)}
				</Card>

				<Card className="min-w-0">
					{leaderboard.isPending ? (
						<p className="p-12 text-center text-text-muted">Loading leaderboard...</p>
					) : leaderboard.isError ? (
						<p className="p-12 text-center text-error">
							Unable to load the leaderboard.
						</p>
					) : leaderboard.data.entries.length === 0 ? (
						<p className="p-12 text-center text-text-muted">
							No completed attempts yet.
						</p>
					) : (
						<DailyChallengeLeaderboardTable
							entries={leaderboard.data.entries}
							onSelectRun={setSelectedRunId}
						/>
					)}
					{leaderboard.data && !leaderboard.isError && (
						<TablePagination
							page={page}
							total={leaderboard.data.total}
							totalPages={leaderboard.data.totalPages}
							isFetching={leaderboard.isFetching}
							onPageChange={setPage}
						/>
					)}
				</Card>

				<HeroDossierModal runId={selectedRunId} onClose={() => setSelectedRunId(null)} />
			</Container>
			<Footer />
		</PageLayout>
	);
}

function getInitialDate(value: string | null): string {
	const today = getTodayUtc();

	return value && /^\d{4}-\d{2}-\d{2}$/.test(value) && value <= today ? value : today;
}
