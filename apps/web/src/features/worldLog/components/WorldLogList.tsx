import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { WorldLogEntry as Entry } from "@app/shared";
import { WorldLogEntry } from "./WorldLogEntry";

type WorldLogListProps = {
	entries: Entry[];
	compact?: boolean;
};

export function WorldLogList({ entries, compact = false }: WorldLogListProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const newestEntryId = entries.at(-1)?.id;

	useEffect(() => {
		const logNode = scrollRef.current;

		if (logNode && !compact) {
			logNode.scrollTop = logNode.scrollHeight;
		}
	}, [newestEntryId, compact]);

	return (
		<div
			ref={scrollRef}
			className={clsx("min-h-0 flex-1", compact ? "overflow-hidden" : "overflow-y-auto")}
			aria-label="World activity"
		>
			<div className="flex min-h-full flex-col justify-end">
				{entries.length ? (
					<ol>
						{(compact ? entries.slice(-1) : entries).map((entry) => (
							<WorldLogEntry key={entry.id} entry={entry} compact={compact} />
						))}
					</ol>
				) : (
					<p className={clsx("text-text-muted", compact && "truncate")}>
						The world awaits its next adventure.
					</p>
				)}
			</div>
		</div>
	);
}
