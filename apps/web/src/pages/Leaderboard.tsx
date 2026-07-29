import { type ClassId } from "@app/content";
import type {
	GetGhostLeaderboardQuery,
	GetRunLeaderboardQuery,
	LeaderboardScope,
} from "@app/shared";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { PageLayout } from "../components/PageLayout";
import { Header } from "../components/Header";
import { Tabs } from "../components/Tabs";
import { TablePagination } from "../components/TablePagination";
import { useAuth } from "../features/auth";
import { HeroDossierModal } from "../features/heroDossier";
import {
	GhostLeaderboardTable,
	LeaderboardFilters,
	RunLeaderboardTable,
	useGhostLeaderboard,
	useRunLeaderboard,
} from "../features/leaderboards";
import { getTodayUtc } from "../utils/date";

const PAGE_SIZE = 20;
const tabs = [
	{ label: "HEROES", value: "heroes" },
	{ label: "GHOSTS", value: "ghosts" },
] as const;

type LeaderboardTab = (typeof tabs)[number]["value"];

export default function Leaderboard() {
	const { hasSession } = useAuth();
	const [activeTab, setActiveTab] = useState<LeaderboardTab>("heroes");
	const [classId, setClassId] = useState<ClassId | "all">("all");
	const [userOnly, setUserOnly] = useState(false);
	const [scope, setScope] = useState<LeaderboardScope>("overall");
	const [dailyDate, setDailyDate] = useState(getTodayUtc);
	const [page, setPage] = useState(1);
	const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

	useEffect(() => {
		if (!hasSession && userOnly) {
			setUserOnly(false);
			setPage(1);
		}
	}, [hasSession, userOnly]);

	const runQuery: GetRunLeaderboardQuery = {
		scope,
		...(scope === "daily" ? { date: dailyDate } : {}),
		...(classId !== "all" ? { classId } : {}),
		...(userOnly && hasSession ? { userOnly: "true" as const } : {}),
		page,
		limit: PAGE_SIZE,
	};

	const ghostQuery: GetGhostLeaderboardQuery = {
		...(classId !== "all" ? { classId } : {}),
		...(userOnly && hasSession ? { userOnly: "true" as const } : {}),
		page,
		limit: PAGE_SIZE,
	};

	const runs = useRunLeaderboard(runQuery, activeTab === "heroes");
	const ghosts = useGhostLeaderboard(ghostQuery, activeTab === "ghosts");

	function handleTabChange(tab: LeaderboardTab) {
		setActiveTab(tab);
		setPage(1);
	}

	function handleClassChange(nextClassId: ClassId | "all") {
		setClassId(nextClassId);
		setPage(1);
	}

	function handleUserOnlyChange(nextUserOnly: boolean) {
		setUserOnly(nextUserOnly);
		setPage(1);
	}

	function handleScopeChange(nextScope: LeaderboardScope) {
		setScope(nextScope);
		setPage(1);
	}

	function handleDailyDateChange(nextDate: string) {
		setDailyDate(nextDate);
		setPage(1);
	}

	return (
		<PageLayout>
			<Header />
			<Container>
				<header className="mb-5 grid gap-2">
					<h1 className="text-primary">LEADERBOARDS</h1>
					<p className="max-w-3xl text-text">
						Honour the heroes who ventured deepest and the ghosts who still haunt the
						road.
					</p>
				</header>

				<Card className="min-w-0">
					<Tabs
						aria-label="Leaderboard type"
						items={tabs}
						value={activeTab}
						onChange={handleTabChange}
						panelClassName="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						renderPanel={(tab) =>
							tab === "heroes" ? (
								<>
									<LeaderboardFilters
										classId={classId}
										onClassChange={handleClassChange}
										showUserOnly={hasSession}
										entryType="heroes"
										userOnly={userOnly}
										onUserOnlyChange={handleUserOnlyChange}
										scope={scope}
										onScopeChange={handleScopeChange}
										dailyDate={dailyDate}
										onDailyDateChange={handleDailyDateChange}
									/>
									{runs.isPending ? (
										<LeaderboardMessage message="Loading hero rankings..." />
									) : runs.isError ? (
										<LeaderboardError onRetry={() => void runs.refetch()} />
									) : runs.data.entries.length === 0 ? (
										<LeaderboardMessage message="No heroes match these filters." />
									) : (
										<RunLeaderboardTable
											entries={runs.data.entries}
											onSelectRun={setSelectedRunId}
										/>
									)}
									{runs.data && !runs.isError && (
										<TablePagination
											page={page}
											total={runs.data.total}
											totalPages={runs.data.totalPages}
											isFetching={runs.isFetching}
											onPageChange={setPage}
										/>
									)}
									{runs.isFetching && !runs.isPending && <UpdatingMessage />}
								</>
							) : (
								<>
									<LeaderboardFilters
										classId={classId}
										onClassChange={handleClassChange}
										showUserOnly={hasSession}
										entryType="ghosts"
										userOnly={userOnly}
										onUserOnlyChange={handleUserOnlyChange}
									/>
									{ghosts.isPending ? (
										<LeaderboardMessage message="Loading ghost rankings..." />
									) : ghosts.isError ? (
										<LeaderboardError onRetry={() => void ghosts.refetch()} />
									) : ghosts.data.entries.length === 0 ? (
										<LeaderboardMessage message="No ghosts match these filters." />
									) : (
										<GhostLeaderboardTable entries={ghosts.data.entries} />
									)}
									{ghosts.data && !ghosts.isError && (
										<TablePagination
											page={page}
											total={ghosts.data.total}
											totalPages={ghosts.data.totalPages}
											isFetching={ghosts.isFetching}
											onPageChange={setPage}
										/>
									)}
									{ghosts.isFetching && !ghosts.isPending && <UpdatingMessage />}
								</>
							)
						}
					/>
				</Card>
			</Container>
			<HeroDossierModal runId={selectedRunId} onClose={() => setSelectedRunId(null)} />
		</PageLayout>
	);
}

function LeaderboardMessage({ message }: { message: string }) {
	return <p className="px-4 py-12 text-center text-text-muted">{message}</p>;
}

function LeaderboardError({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="grid justify-items-center gap-3 px-4 py-12 text-center">
			<p className="text-error">Unable to load the leaderboard.</p>
			<Button type="button" onClick={onRetry}>
				RETRY
			</Button>
		</div>
	);
}

function UpdatingMessage() {
	return (
		<p className="sr-only" aria-live="polite">
			Updating leaderboard...
		</p>
	);
}
