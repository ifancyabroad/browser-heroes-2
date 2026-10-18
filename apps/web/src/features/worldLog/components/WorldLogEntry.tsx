import { CLASSES_BY_ID } from "@app/content";
import type { WorldLogEntry as Entry } from "@app/shared";
import { IconCalendarEvent, IconTrophy } from "@tabler/icons-react";
import { describeWorldLogEvent } from "../utils/describeWorldLogEvent";

export function WorldLogEntry({ entry }: { entry: Entry }) {
	const presentation = describeWorldLogEvent(entry);

	return (
		<li data-entry={entry.id} className="break-words">
			<span className="mr-2 text-text-muted">
				<time dateTime={entry.createdAt} title={new Date(entry.createdAt).toLocaleString()}>
					{new Date(entry.createdAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</time>
				{entry.displayName && <span> · {entry.displayName}</span>}
				{entry.mode === "dailyChallenge" && (
					<span
						className="ml-1"
						role="img"
						aria-label="Daily Challenge"
						title="Daily Challenge"
					>
						<IconCalendarEvent
							aria-hidden="true"
							className="inline h-4 w-4 align-text-bottom"
						/>
					</span>
				)}
			</span>{" "}
			<span className={presentation.colour}>
				{presentation.trophy && (
					<IconTrophy
						aria-hidden="true"
						className="mr-1 inline h-4 w-4 align-text-bottom"
					/>
				)}
				<strong>
					{entry.heroName} the {CLASSES_BY_ID[entry.classId].name}
				</strong>{" "}
				{presentation.text}
			</span>
		</li>
	);
}
