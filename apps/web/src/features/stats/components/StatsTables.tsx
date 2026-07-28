import { getZoneForRun } from "@app/engine";
import type {
	GetGhostStatsQuery,
	GetRunStatsQuery,
	GhostStatsEntryView,
	RunStatsEntryView,
} from "@app/shared";
import {
	DataTable,
	DataTableCell,
	DataTableHeader,
	DataTableHeading,
	DataTableRow,
	DataTableRowAction,
	SortableDataTableHeading,
} from "../../../components/DataTable";
import { HeroIdentity } from "../../../components/HeroIdentity";
import { formatTitle } from "../../../game/effectDisplay";
import { formatDisplayDate } from "../../../utils/date";

type SortProps<TSort extends string> = {
	sort: TSort;
	direction: "asc" | "desc";
	onSort: (sort: TSort) => void;
};

export function RunStatsTable({
	entries,
	sort,
	direction,
	onSort,
	onSelectRun,
}: {
	entries: RunStatsEntryView[];
	onSelectRun: (runId: string) => void;
} & SortProps<GetRunStatsQuery["sort"]>) {
	return (
		<DataTable tableClassName="sm:min-w-275">
			<DataTableHeader>
				<SortableDataTableHeading
					label="HERO"
					sortKey="heroName"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
				/>
				<SortableDataTableHeading
					label="KILLS"
					sortKey="kills"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
				/>
				<SortableDataTableHeading
					label="DAY"
					sortKey="day"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
					hideOnMobile
				/>
				<SortableDataTableHeading
					label="CYCLE"
					sortKey="endlessCycle"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
					hideOnMobile
				/>
				<SortableDataTableHeading
					label="LEVEL"
					sortKey="level"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
					hideOnMobile
				/>
				<DataTableHeading hideOnMobile>ZONE</DataTableHeading>
				<DataTableHeading hideOnMobile>STATUS</DataTableHeading>
				<SortableDataTableHeading
					label="COMPLETED"
					sortKey="completedAt"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					hideOnMobile
				/>
			</DataTableHeader>
			<tbody>
				{entries.map((entry) => (
					<DataTableRow key={entry.runId} onSelect={() => onSelectRun(entry.runId)}>
						<DataTableCell>
							<DataTableRowAction
								label={`Inspect hero ${entry.heroName}`}
								onSelect={() => onSelectRun(entry.runId)}
							>
								<HeroIdentity name={entry.heroName} classId={entry.classId} />
							</DataTableRowAction>
						</DataTableCell>
						<DataTableCell numeric>{entry.kills}</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{entry.day}
						</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{entry.endlessCycle}
						</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{entry.level}
						</DataTableCell>
						<DataTableCell hideOnMobile>
							{formatTitle(getZoneForRun(entry.zoneNumber))}
						</DataTableCell>
						<DataTableCell hideOnMobile>{entry.status.toUpperCase()}</DataTableCell>
						<DataTableCell hideOnMobile>
							{formatDisplayDate(entry.completedAt)}
						</DataTableCell>
					</DataTableRow>
				))}
			</tbody>
		</DataTable>
	);
}

export function GhostStatsTable({
	entries,
	sort,
	direction,
	onSort,
}: { entries: GhostStatsEntryView[] } & SortProps<GetGhostStatsQuery["sort"]>) {
	return (
		<DataTable tableClassName="sm:min-w-250">
			<DataTableHeader>
				<SortableDataTableHeading
					label="GHOST"
					sortKey="name"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
				/>
				<SortableDataTableHeading
					label="KILLS"
					sortKey="kills"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
				/>
				<SortableDataTableHeading
					label="LEVEL"
					sortKey="heroLevel"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
					hideOnMobile
				/>
				<SortableDataTableHeading
					label="DEATHS"
					sortKey="deaths"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
					hideOnMobile
				/>
				<SortableDataTableHeading
					label="ENCOUNTERS"
					sortKey="encounters"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					numeric
					hideOnMobile
				/>
				<DataTableHeading numeric hideOnMobile>
					WIN RATE
				</DataTableHeading>
				<SortableDataTableHeading
					label="UPDATED"
					sortKey="updatedAt"
					activeSort={sort}
					direction={direction}
					onSort={onSort}
					hideOnMobile
				/>
			</DataTableHeader>
			<tbody>
				{entries.map((entry) => (
					<DataTableRow key={entry.ghostId}>
						<DataTableCell>
							<HeroIdentity name={entry.name} classId={entry.classId} />
						</DataTableCell>
						<DataTableCell numeric>{entry.kills}</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{entry.heroLevel}
						</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{entry.deaths}
						</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{entry.encounters}
						</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{Math.round(entry.winRate * 100)}%
						</DataTableCell>
						<DataTableCell hideOnMobile>
							{formatDisplayDate(entry.updatedAt)}
						</DataTableCell>
					</DataTableRow>
				))}
			</tbody>
		</DataTable>
	);
}
