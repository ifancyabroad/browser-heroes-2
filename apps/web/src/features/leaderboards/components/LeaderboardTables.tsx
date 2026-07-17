import { getZoneForRun } from "@app/engine";
import type { GhostLeaderboardEntryView, RunLeaderboardEntryView } from "@app/shared";
import {
	DataTable,
	DataTableCell,
	DataTableHeader,
	DataTableHeading,
	DataTableRow,
} from "../../../components/DataTable";
import { HeroIdentity } from "../../../components/HeroIdentity";
import { formatTitle } from "../../../game/effectDisplay";
import { formatDisplayDate } from "../../../utils/date";

export function RunLeaderboardTable({ entries }: { entries: RunLeaderboardEntryView[] }) {
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
				<DataTableHeading hideOnMobile>COMPLETED</DataTableHeading>
			</DataTableHeader>
			<tbody>
				{entries.map((entry) => (
					<DataTableRow key={entry.runId} highlighted={entry.isCurrentUser}>
						<DataTableCell numeric className="w-12 sm:w-auto">
							{entry.rank}
						</DataTableCell>
						<DataTableCell>
							<HeroIdentity
								name={entry.heroName}
								classId={entry.classId}
								isCurrentUser={entry.isCurrentUser}
							/>
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
						<DataTableCell hideOnMobile>
							{formatDisplayDate(entry.completedAt)}
						</DataTableCell>
					</DataTableRow>
				))}
			</tbody>
		</DataTable>
	);
}

export function GhostLeaderboardTable({ entries }: { entries: GhostLeaderboardEntryView[] }) {
	return (
		<DataTable tableClassName="sm:min-w-225">
			<DataTableHeader>
				<DataTableHeading numeric className="w-12 sm:w-auto">
					RANK
				</DataTableHeading>
				<DataTableHeading>GHOST</DataTableHeading>
				<DataTableHeading numeric className="w-18 sm:w-auto">
					KILLS
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					LEVEL
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					DEATHS
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					ENCOUNTERS
				</DataTableHeading>
				<DataTableHeading numeric hideOnMobile>
					WIN RATE
				</DataTableHeading>
			</DataTableHeader>
			<tbody>
				{entries.map((entry) => (
					<DataTableRow key={entry.ghostId} highlighted={entry.isCurrentUser}>
						<DataTableCell numeric className="w-12 sm:w-auto">
							{entry.rank}
						</DataTableCell>
						<DataTableCell>
							<HeroIdentity
								name={entry.name}
								classId={entry.classId}
								isCurrentUser={entry.isCurrentUser}
							/>
						</DataTableCell>
						<DataTableCell numeric className="w-18 sm:w-auto">
							{entry.kills}
						</DataTableCell>
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
					</DataTableRow>
				))}
			</tbody>
		</DataTable>
	);
}
