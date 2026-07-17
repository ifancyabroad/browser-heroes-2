import { CLASSES_BY_ID } from "@app/content";
import type { GhostLeaderboardEntryView, RunLeaderboardEntryView } from "@app/shared";
import { getZoneForRun } from "@app/engine";
import clsx from "clsx";
import { Badge } from "../../../components/Badge";
import { formatTitle } from "../../../game/effectDisplay";

const headingClassName =
	"whitespace-nowrap border-b-2 border-border-secondary px-3 py-2 text-left font-normal text-text-label";
const numericHeadingClassName = `${headingClassName} text-right`;
const cellClassName = "whitespace-nowrap px-3 py-2";
const numericCellClassName = `${cellClassName} text-right text-text-bright`;

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
		<div className="flex min-w-52 items-center gap-2">
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
			<table className="w-full min-w-200 border-collapse">
				<thead>
					<tr className="bg-bg-elevated">
						<th scope="col" className={numericHeadingClassName}>
							RANK
						</th>
						<th scope="col" className={headingClassName}>
							HERO
						</th>
						<th scope="col" className={numericHeadingClassName}>
							LEVEL
						</th>
						<th scope="col" className={numericHeadingClassName}>
							BATTLE
						</th>
						<th scope="col" className={headingClassName}>
							ZONE
						</th>
						<th scope="col" className={headingClassName}>
							COMPLETED
						</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.runId} className={rowClassName(entry.isCurrentUser)}>
							<td className={numericCellClassName}>{entry.rank}</td>
							<td className={cellClassName}>
								<HeroIdentity
									name={entry.heroName}
									classId={entry.classId}
									isCurrentUser={entry.isCurrentUser}
								/>
							</td>
							<td className={numericCellClassName}>{entry.level}</td>
							<td className={numericCellClassName}>{entry.battleNumber}</td>
							<td className={cellClassName}>
								{formatTitle(getZoneForRun(entry.zoneNumber))}
							</td>
							<td className={cellClassName}>
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
			<table className="w-full min-w-225 border-collapse">
				<thead>
					<tr className="bg-bg-elevated">
						<th scope="col" className={numericHeadingClassName}>
							RANK
						</th>
						<th scope="col" className={headingClassName}>
							GHOST
						</th>
						<th scope="col" className={numericHeadingClassName}>
							LEVEL
						</th>
						<th scope="col" className={numericHeadingClassName}>
							KILLS
						</th>
						<th scope="col" className={numericHeadingClassName}>
							DEATHS
						</th>
						<th scope="col" className={numericHeadingClassName}>
							ENCOUNTERS
						</th>
						<th scope="col" className={numericHeadingClassName}>
							WIN RATE
						</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.ghostId} className={rowClassName(entry.isCurrentUser)}>
							<td className={numericCellClassName}>{entry.rank}</td>
							<td className={cellClassName}>
								<HeroIdentity
									name={entry.name}
									classId={entry.classId}
									isCurrentUser={entry.isCurrentUser}
								/>
							</td>
							<td className={numericCellClassName}>{entry.heroLevel}</td>
							<td className={numericCellClassName}>{entry.kills}</td>
							<td className={numericCellClassName}>{entry.deaths}</td>
							<td className={numericCellClassName}>{entry.encounters}</td>
							<td className={numericCellClassName}>
								{Math.round(entry.winRate * 100)}%
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
