import { CLASSES_BY_ID } from "@app/content";
import { getZoneForRun } from "@app/engine";
import type { GhostHallOfFameEntryView, HeroHallOfFameEntryView } from "@app/shared";
import { Star } from "pixelarticons/react/Star";
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

export function HeroHallOfFameTable(props: {
	entries: HeroHallOfFameEntryView[];
	onSelectRun: (runId: string) => void;
}) {
	return (
		<DataTable tableClassName="sm:min-w-248">
			<colgroup>
				<col className="w-12 sm:w-16" />
				<col />
				<col className="w-16 sm:w-24" />
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
						<DataTableCell numeric>{entry.rank}</DataTableCell>
						<DataTableCell>
							<DataTableRowAction
								label={`Inspect hero ${entry.heroName}${entry.displayName ? ` owned by ${entry.displayName}` : ""}`}
								onSelect={() => props.onSelectRun(entry.runId)}
							>
								<HeroIdentity
									name={entry.heroName}
									classId={entry.classId}
									level={entry.level}
									displayName={entry.displayName}
									nameTone={entry.isCurrentUser ? "primary" : "default"}
									portraitAdornment={
										entry.mode === "dailyChallenge" ? (
											<span
												aria-label="Daily Challenge"
												title="Daily Challenge"
												className="inline-flex"
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
						<DataTableCell hideOnMobile>
							<span className="block whitespace-normal break-words leading-5">
								{entry.slainBy?.name ?? "—"}
							</span>
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

export function GhostHallOfFameTable({ entries }: { entries: GhostHallOfFameEntryView[] }) {
	return (
		<DataTable tableClassName="sm:min-w-184">
			<colgroup>
				<col className="w-12 sm:w-16" />
				<col />
				<col className="w-16 sm:w-24" />
				<col className="hidden sm:table-column sm:w-28" />
				<col className="hidden sm:table-column sm:w-48" />
			</colgroup>
			<DataTableHeader>
				<DataTableHeading numeric>RANK</DataTableHeading>
				<DataTableHeading>GHOST</DataTableHeading>
				<DataTableHeading numeric>KILLS</DataTableHeading>
				<DataTableHeading hideOnMobile>STATUS</DataTableHeading>
				<DataTableHeading hideOnMobile>BANISHED BY</DataTableHeading>
			</DataTableHeader>
			<tbody>
				{entries.map((entry) => (
					<DataTableRow key={entry.ghostId} highlighted={entry.isCurrentUser}>
						<DataTableCell numeric>{entry.rank}</DataTableCell>
						<DataTableCell>
							<HeroIdentity
								name={entry.name}
								classId={entry.classId}
								level={entry.heroLevel}
								displayName={entry.displayName}
								nameTone={entry.isCurrentUser ? "primary" : "default"}
							/>
						</DataTableCell>
						<DataTableCell numeric>{entry.kills}</DataTableCell>
						<DataTableCell hideOnMobile>{entry.status.toUpperCase()}</DataTableCell>
						<DataTableCell hideOnMobile>
							{entry.banishedBy ? (
								<span className="block whitespace-normal break-words leading-5">
									{entry.banishedBy.heroName} the{" "}
									{CLASSES_BY_ID[entry.banishedBy.classId].name}
								</span>
							) : (
								"—"
							)}
						</DataTableCell>
					</DataTableRow>
				))}
			</tbody>
		</DataTable>
	);
}
