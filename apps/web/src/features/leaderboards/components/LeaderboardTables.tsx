import { CLASSES_BY_ID } from "@app/content";
import type { GhostLeaderboardEntryView, RunLeaderboardEntryView } from "@app/shared";
import { getZoneForRun } from "@app/engine";
import clsx from "clsx";
import { Badge } from "../../../components/Badge";
import { formatTitle } from "../../../game/effectDisplay";

const headingClassName =
	"whitespace-nowrap border-b-2 border-border-secondary px-2 py-2 text-left font-normal text-text-label sm:px-3";
const numericHeadingClassName = `${headingClassName} text-right`;
const hiddenHeadingClassName = `${headingClassName} hidden sm:table-cell`;
const hiddenNumericHeadingClassName = `${numericHeadingClassName} hidden sm:table-cell`;
const cellClassName = "whitespace-nowrap px-2 py-2 sm:px-3";
const numericCellClassName = `${cellClassName} text-right text-text-bright`;
const hiddenCellClassName = `${cellClassName} hidden sm:table-cell`;
const hiddenNumericCellClassName = `${numericCellClassName} hidden sm:table-cell`;
const primaryMetricHeadingClassName = `${numericHeadingClassName} w-18 sm:w-auto`;
const primaryMetricCellClassName = `${numericCellClassName} w-18 sm:w-auto`;
const rankHeadingClassName = `${numericHeadingClassName} w-12 sm:w-auto`;
const rankCellClassName = `${numericCellClassName} w-12 sm:w-auto`;

function HeroIdentity({
	name,
	classId,
	isCurrentUser,
}: {
	name: string;
	classId: RunLeaderboardEntryView["classId"];
	isCurrentUser: boolean;
}) {
	const heroClass = CLASSES_BY_ID[classId];

	return (
		<div className="flex min-w-0 items-center gap-2 sm:min-w-52">
			<img
				src={heroClass.icon}
				alt=""
				width="40"
				height="40"
				loading="lazy"
				className="shrink-0 border-2 border-bg-elevated bg-bg-base"
			/>
			<div className="grid min-w-0">
				<div className="flex items-center gap-2">
					<span className="truncate text-text-bright">{name}</span>
					{isCurrentUser && <Badge label="YOU" textTone="bright" />}
				</div>
				<span className="text-text-muted">{heroClass.name}</span>
			</div>
		</div>
	);
}

function rowClassName(isCurrentUser: boolean) {
	return clsx(
		"border-b border-border-secondary last:border-b-0",
		isCurrentUser && "bg-bg-panel text-primary",
	);
}

function formatCompletedAt(completedAt: string) {
	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(completedAt));
}

export function RunLeaderboardTable({ entries }: { entries: RunLeaderboardEntryView[] }) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full table-fixed border-collapse sm:min-w-200 sm:table-auto">
				<thead>
					<tr className="bg-bg-elevated">
						<th scope="col" className={rankHeadingClassName}>
							RANK
						</th>
						<th scope="col" className={headingClassName}>
							HERO
						</th>
						<th scope="col" className={primaryMetricHeadingClassName}>
							BATTLE
						</th>
						<th scope="col" className={hiddenNumericHeadingClassName}>
							LEVEL
						</th>
						<th scope="col" className={hiddenHeadingClassName}>
							ZONE
						</th>
						<th scope="col" className={hiddenHeadingClassName}>
							COMPLETED
						</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.runId} className={rowClassName(entry.isCurrentUser)}>
							<td className={rankCellClassName}>{entry.rank}</td>
							<td className={cellClassName}>
								<HeroIdentity
									name={entry.heroName}
									classId={entry.classId}
									isCurrentUser={entry.isCurrentUser}
								/>
							</td>
							<td className={primaryMetricCellClassName}>{entry.battleNumber}</td>
							<td className={hiddenNumericCellClassName}>{entry.level}</td>
							<td className={hiddenCellClassName}>
								{formatTitle(getZoneForRun(entry.zoneNumber))}
							</td>
							<td className={hiddenCellClassName}>
								{formatCompletedAt(entry.completedAt)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function GhostLeaderboardTable({ entries }: { entries: GhostLeaderboardEntryView[] }) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full table-fixed border-collapse sm:min-w-225 sm:table-auto">
				<thead>
					<tr className="bg-bg-elevated">
						<th scope="col" className={rankHeadingClassName}>
							RANK
						</th>
						<th scope="col" className={headingClassName}>
							GHOST
						</th>
						<th scope="col" className={primaryMetricHeadingClassName}>
							KILLS
						</th>
						<th scope="col" className={hiddenNumericHeadingClassName}>
							LEVEL
						</th>
						<th scope="col" className={hiddenNumericHeadingClassName}>
							DEATHS
						</th>
						<th scope="col" className={hiddenNumericHeadingClassName}>
							ENCOUNTERS
						</th>
						<th scope="col" className={hiddenNumericHeadingClassName}>
							WIN RATE
						</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.ghostId} className={rowClassName(entry.isCurrentUser)}>
							<td className={rankCellClassName}>{entry.rank}</td>
							<td className={cellClassName}>
								<HeroIdentity
									name={entry.name}
									classId={entry.classId}
									isCurrentUser={entry.isCurrentUser}
								/>
							</td>
							<td className={primaryMetricCellClassName}>{entry.kills}</td>
							<td className={hiddenNumericCellClassName}>{entry.heroLevel}</td>
							<td className={hiddenNumericCellClassName}>{entry.deaths}</td>
							<td className={hiddenNumericCellClassName}>{entry.encounters}</td>
							<td className={hiddenNumericCellClassName}>
								{Math.round(entry.winRate * 100)}%
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
