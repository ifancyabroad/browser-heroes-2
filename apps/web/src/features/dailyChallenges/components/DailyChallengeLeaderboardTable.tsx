import { getZoneForRun } from "@app/engine";
import type { ChallengeEntryView } from "@app/shared";
import { Badge } from "../../../components/Badge";
import {
	DataTable,
	DataTableCell,
	DataTableHeader,
	DataTableHeading,
	DataTableRow,
	DataTableRowAction,
} from "../../../components/DataTable";
import { HeroIdentity } from "../../../components/HeroIdentity";
import { formatTitle } from "../../../presentation/effects";
import { formatDisplayDate } from "../../../utils/date";

export function DailyChallengeLeaderboardTable(props: {
	currentUserEntry: ChallengeEntryView | null;
	entries: ChallengeEntryView[];
	onSelectRun: (runId: string) => void;
}) {
	return (
		<DataTable tableClassName="sm:min-w-272">
			<colgroup>
				<col className="w-16" />
				<col />
				<col className="w-24" />
				<col className="hidden sm:table-column sm:w-24" />
				<col className="hidden sm:table-column sm:w-24" />
				<col className="hidden sm:table-column sm:w-36" />
				<col className="hidden sm:table-column sm:w-40" />
				<col className="hidden sm:table-column sm:w-48" />
			</colgroup>
			<DataTableHeader>
				<DataTableHeading numeric>RANK</DataTableHeading>
				<DataTableHeading>HERO</DataTableHeading>
				<DataTableHeading numeric>KILLS</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					DAY
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					CYCLE
				</DataTableHeading>
				<DataTableHeading hideOnMobile>ZONE</DataTableHeading>
				<DataTableHeading hideOnMobile>SLAIN BY</DataTableHeading>
				<DataTableHeading hideOnMobile>COMPLETED</DataTableHeading>
			</DataTableHeader>
			<tbody>
				{props.currentUserEntry && (
					<LeaderboardEntryRow
						entry={props.currentUserEntry}
						onSelectRun={props.onSelectRun}
						pinned
					/>
				)}
				{props.entries.map((entry) => (
					<LeaderboardEntryRow
						key={entry.runId}
						entry={entry}
						onSelectRun={props.onSelectRun}
					/>
				))}
			</tbody>
		</DataTable>
	);
}

function LeaderboardEntryRow(props: {
	entry: ChallengeEntryView;
	onSelectRun: (runId: string) => void;
	pinned?: boolean;
}) {
	const { entry, onSelectRun, pinned = false } = props;

	return (
		<DataTableRow
			highlighted={entry.isCurrentUser}
			onSelect={() => onSelectRun(entry.runId)}
			className={pinned ? "border-b-2" : undefined}
		>
			<DataTableCell numeric>{entry.rank}</DataTableCell>
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
							entry.isCurrentUser ? (
								<Badge label="YOU" textTone="bright" />
							) : undefined
						}
					/>
				</DataTableRowAction>
			</DataTableCell>
			<DataTableCell numeric>{entry.kills}</DataTableCell>
			<DataTableCell numeric hideOnMobile>
				{entry.day}
			</DataTableCell>
			<DataTableCell numeric hideOnMobile>
				{entry.endlessCycle}
			</DataTableCell>
			<DataTableCell hideOnMobile>
				{formatTitle(getZoneForRun(entry.zoneNumber))}
			</DataTableCell>
			<DataTableCell hideOnMobile>{entry.slainBy?.name ?? "—"}</DataTableCell>
			<DataTableCell hideOnMobile>{formatDisplayDate(entry.completedAt)}</DataTableCell>
		</DataTableRow>
	);
}
