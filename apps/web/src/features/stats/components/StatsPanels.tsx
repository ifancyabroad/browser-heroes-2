import type { GetGhostStatsQuery, GetRunStatsQuery, UserStatsSummaryView } from "@app/shared";
import { useState } from "react";
import { TablePagination } from "../../../components/TablePagination";
import { HeroDossierModal } from "../../heroDossier";
import { useGhostStats } from "../hooks/useGhostStats";
import { useRunStats } from "../hooks/useRunStats";
import { useStatsTableControls } from "../hooks/useStatsTableControls";
import { StatsDataState } from "./StatsDataState";
import { StatsFilters } from "./StatsFilters";
import { StatsSummary } from "./StatsSummary";
import { GhostStatsTable, RunStatsTable } from "./StatsTables";

const PAGE_SIZE = 20;

type CommonPanelProps = {
	hasSession: boolean;
	isActive: boolean;
	summary: UserStatsSummaryView;
	summaryPending: boolean;
	summaryError: boolean;
};

export function HeroStatsPanel(props: CommonPanelProps) {
	const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
	const {
		classId,
		searchInput,
		search,
		sort,
		direction,
		page,
		setPage,
		handleClassChange,
		handleSearchInputChange,
		handleSort,
	} = useStatsTableControls<GetRunStatsQuery["sort"]>({
		defaultSort: "completedAt",
		nameSort: "heroName",
	});
	const query: GetRunStatsQuery = {
		page,
		limit: PAGE_SIZE,
		sort,
		direction,
		...(classId !== "all" ? { classId } : {}),
		...(search ? { search } : {}),
	};
	const runs = useRunStats(query, props.hasSession && props.isActive);
	return (
		<>
			<SummarySection tab="heroes" {...props} />
			<StatsFilters
				entryType="heroes"
				classId={classId}
				searchInput={searchInput}
				onClassChange={handleClassChange}
				onSearchInputChange={handleSearchInputChange}
			/>
			{runs.isPending && props.hasSession ? (
				<StatsDataState message="Loading hero stats..." />
			) : runs.isError && props.hasSession ? null : (runs.data?.entries.length ?? 0) === 0 ? (
				<StatsDataState
					message={
						search || classId !== "all"
							? "No heroes match these filters."
							: "No completed heroes yet."
					}
				/>
			) : (
				<RunStatsTable
					entries={runs.data?.entries ?? []}
					sort={sort}
					direction={direction}
					onSort={handleSort}
					onSelectRun={setSelectedRunId}
				/>
			)}
			{props.hasSession && runs.data && !runs.isError && (
				<TablePagination
					page={page}
					total={runs.data.total}
					totalPages={runs.data.totalPages}
					isFetching={runs.isFetching}
					onPageChange={setPage}
				/>
			)}
			{runs.isFetching && !runs.isPending && <UpdatingMessage />}
			<HeroDossierModal runId={selectedRunId} onClose={() => setSelectedRunId(null)} />
		</>
	);
}

export function GhostStatsPanel(props: CommonPanelProps) {
	const {
		classId,
		searchInput,
		search,
		sort,
		direction,
		page,
		setPage,
		handleClassChange,
		handleSearchInputChange,
		handleSort,
	} = useStatsTableControls<GetGhostStatsQuery["sort"]>({
		defaultSort: "updatedAt",
		nameSort: "name",
	});
	const query: GetGhostStatsQuery = {
		page,
		limit: PAGE_SIZE,
		sort,
		direction,
		...(classId !== "all" ? { classId } : {}),
		...(search ? { search } : {}),
	};
	const ghosts = useGhostStats(query, props.hasSession && props.isActive);
	return (
		<>
			<SummarySection tab="ghosts" {...props} />
			<StatsFilters
				entryType="ghosts"
				classId={classId}
				searchInput={searchInput}
				onClassChange={handleClassChange}
				onSearchInputChange={handleSearchInputChange}
			/>
			{ghosts.isPending && props.hasSession ? (
				<StatsDataState message="Loading ghost stats..." />
			) : ghosts.isError && props.hasSession ? null : (ghosts.data?.entries.length ?? 0) ===
			  0 ? (
				<StatsDataState
					message={
						search || classId !== "all"
							? "No ghosts match these filters."
							: "No ghosts yet."
					}
				/>
			) : (
				<GhostStatsTable
					entries={ghosts.data?.entries ?? []}
					sort={sort}
					direction={direction}
					onSort={handleSort}
				/>
			)}
			{props.hasSession && ghosts.data && !ghosts.isError && (
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
	);
}

function SummarySection({
	tab,
	summary,
	summaryPending,
	summaryError,
	hasSession,
}: CommonPanelProps & { tab: "heroes" | "ghosts" }) {
	if (summaryPending && hasSession) {
		return <StatsSummaryLoading tab={tab} summary={summary} />;
	}
	if (summaryError && hasSession) {
		return null;
	}
	return <StatsSummary tab={tab} summary={summary} />;
}

function StatsSummaryLoading({
	tab,
	summary,
}: {
	tab: "heroes" | "ghosts";
	summary: UserStatsSummaryView;
}) {
	return (
		<div className="relative" aria-busy="true">
			<div className="invisible" aria-hidden="true">
				<StatsSummary tab={tab} summary={summary} />
			</div>
			<p className="absolute inset-0 grid place-items-center text-text-muted">
				Loading overall stats...
			</p>
		</div>
	);
}

function UpdatingMessage() {
	return (
		<p className="sr-only" aria-live="polite">
			Updating stats...
		</p>
	);
}
