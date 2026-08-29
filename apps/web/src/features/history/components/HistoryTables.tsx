import { getZoneForRun } from "@app/engine";
import type {
	GetGhostHistoryQuery,
	GetRunHistoryQuery,
	GhostHistoryEntryView,
	RunHistoryEntryView,
} from "@app/shared";
import { Star } from "pixelarticons/react/Star";
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
import { formatTitle } from "../../../presentation/effects";
import { formatDisplayDate } from "../../../utils/date";

type SortProps<TSort extends string> = {
	sort: TSort;
	direction: "asc" | "desc";
	onSort: (sort: TSort) => void;
};

export function RunHistoryTable({
	entries,
	sort,
	direction,
	onSort,
	onSelectRun,
}: {
	entries: RunHistoryEntryView[];
	onSelectRun: (runId: string) => void;
} & SortProps<GetRunHistoryQuery["sort"]>) {
	return (
		<DataTable tableClassName="sm:min-w-224">
			<colgroup>
				<col />
				<col className="w-24" />
				<col className="hidden sm:table-column sm:w-24" />
				<col className="hidden sm:table-column sm:w-36" />
				<col className="hidden sm:table-column sm:w-28" />
				<col className="hidden sm:table-column sm:w-48" />
			</colgroup>
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
								<HeroIdentity
									name={entry.heroName}
									classId={entry.classId}
									level={entry.level}
									nameAdornment={
										entry.mode === "dailyChallenge" ? (
											<span
												aria-label="Daily Challenge"
												title="Daily Challenge"
												className="inline-flex shrink-0"
											>
												<Star
													aria-hidden="true"
													className="h-4 w-4 text-primary"
												/>
											</span>
										) : undefined
									}
								/>
							</DataTableRowAction>
						</DataTableCell>
						<DataTableCell numeric>{entry.kills}</DataTableCell>
						<DataTableCell numeric hideOnMobile>
							{entry.day}
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

export function GhostHistoryTable({
	entries,
	sort,
	direction,
	onSort,
}: { entries: GhostHistoryEntryView[] } & SortProps<GetGhostHistoryQuery["sort"]>) {
	return (
		<DataTable tableClassName="sm:min-w-216">
			<colgroup>
				<col />
				<col className="w-24" />
				<col className="hidden sm:table-column sm:w-24" />
				<col className="hidden sm:table-column sm:w-28" />
				<col className="hidden sm:table-column sm:w-28" />
				<col className="hidden sm:table-column sm:w-48" />
			</colgroup>
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
							<HeroIdentity
								name={entry.name}
								classId={entry.classId}
								level={entry.heroLevel}
							/>
						</DataTableCell>
						<DataTableCell numeric>{entry.kills}</DataTableCell>
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
