import { getZoneForRun } from "@app/engine";
import type { ChallengeEntryView } from "@app/shared";
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
	entries: ChallengeEntryView[];
	onSelectRun: (runId: string) => void;
}) {
	return (
		<DataTable tableClassName="sm:min-w-225">
			<DataTableHeader>
				<DataTableHeading numeric className="w-12 sm:w-auto">
					RANK
				</DataTableHeading>
				<DataTableHeading>HERO</DataTableHeading>
				<DataTableHeading numeric className="w-18 sm:w-auto">
					KILLS
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					DAY
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					CYCLE
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					LEVEL
				</DataTableHeading>
				<DataTableHeading hideOnMobile>ZONE</DataTableHeading>
				<DataTableHeading hideOnMobile>SLAIN BY</DataTableHeading>
				<DataTableHeading hideOnMobile>COMPLETED</DataTableHeading>
			</DataTableHeader>
			<tbody>
				{props.entries.map((entry) => (
					<DataTableRow
						key={entry.runId}
						highlighted={entry.isCurrentUser}
						onSelect={() => props.onSelectRun(entry.runId)}
					>
						<DataTableCell numeric className="w-12 sm:w-auto">
							{entry.rank}
						</DataTableCell>
						<DataTableCell>
							<DataTableRowAction
								label={`Inspect hero ${entry.heroName}`}
								onSelect={() => props.onSelectRun(entry.runId)}
							>
								<HeroIdentity
									name={entry.heroName}
									classId={entry.classId}
									isCurrentUser={entry.isCurrentUser}
								/>
							</DataTableRowAction>
						</DataTableCell>
						<DataTableCell numeric className="w-18 sm:w-auto">
							{entry.kills}
						</DataTableCell>
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
						<DataTableCell hideOnMobile>{entry.slainBy?.name ?? "—"}</DataTableCell>
						<DataTableCell hideOnMobile>
							{formatDisplayDate(entry.completedAt)}
						</DataTableCell>
					</DataTableRow>
				))}
			</tbody>
		</DataTable>
	);
}
