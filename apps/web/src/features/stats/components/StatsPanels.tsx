import type { GetGhostStatsQuery, GetRunStatsQuery, UserStatsSummaryView } from "@app/shared";
import { Card } from "../../../components/Card";
import { TablePagination } from "../../../components/TablePagination";
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
	onSummaryRetry: () => void;
};

export function HeroStatsPanel(props: CommonPanelProps) {
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
		<div className="grid gap-5">
			<SummarySection tab="heroes" {...props} />
			<Card title="RUN HISTORY" className="min-w-0">
				<div className="pt-3">
					<StatsFilters
						entryType="heroes"
						classId={classId}
						searchInput={searchInput}
						onClassChange={handleClassChange}
						onSearchInputChange={handleSearchInputChange}
					/>
					{runs.isPending && props.hasSession ? (
						<StatsDataState message="Loading hero stats..." />
					) : runs.isError && props.hasSession ? (
						<StatsDataState
							message="Unable to load hero stats."
							tone="error"
							onRetry={() => void runs.refetch()}
						/>
					) : (runs.data?.entries.length ?? 0) === 0 ? (
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
				</div>
			</Card>
		</div>
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
		<div className="grid gap-5">
			<SummarySection tab="ghosts" {...props} />
			<Card title="GHOST ACTIVITY" className="min-w-0">
				<div className="pt-3">
					<StatsFilters
						entryType="ghosts"
						classId={classId}
						searchInput={searchInput}
						onClassChange={handleClassChange}
						onSearchInputChange={handleSearchInputChange}
					/>
					{ghosts.isPending && props.hasSession ? (
						<StatsDataState message="Loading ghost stats..." />
					) : ghosts.isError && props.hasSession ? (
						<StatsDataState
							message="Unable to load ghost stats."
							tone="error"
							onRetry={() => void ghosts.refetch()}
						/>
					) : (ghosts.data?.entries.length ?? 0) === 0 ? (
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
				</div>
			</Card>
		</div>
	);
}

function SummarySection({
	tab,
	summary,
	summaryPending,
	summaryError,
	hasSession,
	onSummaryRetry,
}: CommonPanelProps & { tab: "heroes" | "ghosts" }) {
	if (summaryPending && hasSession) {
		return (
			<Card title={tab === "heroes" ? "HERO RECORD" : "GHOST RECORD"}>
				<StatsDataState message="Loading overall stats..." spacing="compact" />
			</Card>
		);
	}
	if (summaryError && hasSession) {
		return (
			<Card title={tab === "heroes" ? "HERO RECORD" : "GHOST RECORD"}>
				<StatsDataState
					message="Unable to load overall stats."
					tone="error"
					onRetry={onSummaryRetry}
					spacing="compact"
				/>
			</Card>
		);
	}
	return <StatsSummary tab={tab} summary={summary} />;
}

function UpdatingMessage() {
	return (
		<p className="sr-only" aria-live="polite">
			Updating stats...
		</p>
	);
}
