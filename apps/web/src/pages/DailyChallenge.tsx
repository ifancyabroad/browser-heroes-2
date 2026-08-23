import { ArrowLeft } from "pixelarticons/react/ArrowLeft";
import { ArrowRight } from "pixelarticons/react/ArrowRight";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, IconButton } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { TablePagination } from "../components/TablePagination";
import { DailyChallengeLeaderboardTable } from "../features/dailyChallenges/components/DailyChallengeLeaderboardTable";
import { useDailyChallengeLeaderboard } from "../features/dailyChallenges/hooks/useDailyChallengeLeaderboard";
import { HeroDossierModal } from "../features/heroDossier";
import { addUtcDays, formatDailyDate, getTodayUtc } from "../utils/date";

const PAGE_SIZE = 20;

export default function DailyChallenge() {
	const [searchParams] = useSearchParams();
	const [date, setDate] = useState(() => getInitialDate(searchParams.get("date")));
	const [page, setPage] = useState(1);
	const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

	const leaderboard = useDailyChallengeLeaderboard(date, { page, limit: PAGE_SIZE });
	const leaderboardData =
		leaderboard.data?.challenge.date === date ? leaderboard.data : undefined;
	const isToday = date === getTodayUtc();

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

				<Card className="min-w-0">
					<div
						className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b-2 border-border-secondary bg-bg-panel px-3 py-2 sm:grid-cols-[1fr_auto_1fr]"
						aria-label="Daily Challenge date"
					>
						<div className="flex items-center gap-2 sm:justify-self-start">
							<IconButton
								type="button"
								aria-label="Previous challenge"
								onClick={() => changeDate(addUtcDays(date, -1))}
							>
								<ArrowLeft aria-hidden="true" className="h-4 w-4" />
							</IconButton>
							<div aria-hidden="true" className="invisible hidden sm:block">
								<Button type="button" tabIndex={-1}>
									TODAY
								</Button>
							</div>
						</div>
						<p className="whitespace-nowrap text-center text-text-bright sm:min-w-52">
							{formatDailyDate(date)}
						</p>
						<div className="flex items-center gap-2 sm:justify-self-end">
							<Button
								type="button"
								variant="primary"
								disabled={isToday}
								onClick={() => changeDate(getTodayUtc())}
							>
								TODAY
							</Button>
							<IconButton
								type="button"
								aria-label="Next challenge"
								disabled={isToday}
								onClick={() => changeDate(addUtcDays(date, 1))}
							>
								<ArrowRight aria-hidden="true" className="h-4 w-4" />
							</IconButton>
						</div>
					</div>

					{leaderboard.isPending || (!leaderboardData && leaderboard.isFetching) ? (
						<p className="p-12 text-center text-text-muted">Loading leaderboard...</p>
					) : leaderboard.isError || !leaderboardData ? (
						<p className="p-12 text-center text-error">
							Unable to load the leaderboard.
						</p>
					) : leaderboardData.entries.length === 0 ? (
						<p className="p-12 text-center text-text-muted">
							No completed attempts yet.
						</p>
					) : (
						<DailyChallengeLeaderboardTable
							entries={leaderboardData.entries}
							onSelectRun={setSelectedRunId}
						/>
					)}
					{leaderboardData && !leaderboard.isError && (
						<TablePagination
							page={page}
							total={leaderboardData.total}
							totalPages={leaderboardData.totalPages}
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
