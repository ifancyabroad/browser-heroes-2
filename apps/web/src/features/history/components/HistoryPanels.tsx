import type { GetGhostHistoryQuery, GetRunHistoryQuery } from "@app/shared";
import { useState } from "react";
import { TablePagination } from "../../../components/TablePagination";
import { HeroDossierModal } from "../../heroDossier";
import { useGhostHistory } from "../hooks/useGhostHistory";
import { useRunHistory } from "../hooks/useRunHistory";
import { useHistoryTableControls } from "../hooks/useHistoryTableControls";
import { HistoryDataState } from "./HistoryDataState";
import { HistoryFilters } from "./HistoryFilters";
import { GhostHistoryTable, RunHistoryTable } from "./HistoryTables";

const PAGE_SIZE = 20;

type CommonPanelProps = {
	hasSession: boolean;
	isActive: boolean;
};

export function HeroHistoryPanel(props: CommonPanelProps) {
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
	} = useHistoryTableControls<GetRunHistoryQuery["sort"]>({
		defaultSort: "completedAt",
		nameSort: "heroName",
	});
	const query: GetRunHistoryQuery = {
		page,
		limit: PAGE_SIZE,
		sort,
		direction,
		...(classId !== "all" ? { classId } : {}),
		...(search ? { search } : {}),
	};
	const runs = useRunHistory(query, props.hasSession && props.isActive);
	return (
		<>
			<HistoryFilters
				entryType="heroes"
				classId={classId}
				searchInput={searchInput}
				onClassChange={handleClassChange}
				onSearchInputChange={handleSearchInputChange}
			/>
			{runs.isPending && props.hasSession ? (
				<HistoryDataState message="Loading hero history..." />
			) : runs.isError && props.hasSession ? null : (runs.data?.entries.length ?? 0) === 0 ? (
				<HistoryDataState
					message={
						search || classId !== "all"
							? "No heroes match these filters."
							: "No completed heroes yet."
					}
				/>
			) : (
				<RunHistoryTable
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

export function GhostHistoryPanel(props: CommonPanelProps) {
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
	} = useHistoryTableControls<GetGhostHistoryQuery["sort"]>({
		defaultSort: "updatedAt",
		nameSort: "name",
	});
	const query: GetGhostHistoryQuery = {
		page,
		limit: PAGE_SIZE,
		sort,
		direction,
		...(classId !== "all" ? { classId } : {}),
		...(search ? { search } : {}),
	};
	const ghosts = useGhostHistory(query, props.hasSession && props.isActive);
	return (
		<>
			<HistoryFilters
				entryType="ghosts"
				classId={classId}
				searchInput={searchInput}
				onClassChange={handleClassChange}
				onSearchInputChange={handleSearchInputChange}
			/>
			{ghosts.isPending && props.hasSession ? (
				<HistoryDataState message="Loading ghost history..." />
			) : ghosts.isError && props.hasSession ? null : (ghosts.data?.entries.length ?? 0) ===
			  0 ? (
				<HistoryDataState
					message={
						search || classId !== "all"
							? "No ghosts match these filters."
							: "No ghosts yet."
					}
				/>
			) : (
				<GhostHistoryTable
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

function UpdatingMessage() {
	return (
		<p className="sr-only" aria-live="polite">
			Updating history...
		</p>
	);
}
