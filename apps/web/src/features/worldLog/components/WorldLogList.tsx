import { useEffect, useRef } from "react";
import type { WorldLogEntry as Entry } from "@app/shared";
import { WorldLogEntry } from "./WorldLogEntry";

type WorldLogListProps = {
	entries: Entry[];
};

export function WorldLogList({ entries }: WorldLogListProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const newestEntryId = entries.at(-1)?.id;

	useEffect(() => {
		const logNode = scrollRef.current;

		if (logNode) {
			logNode.scrollTop = logNode.scrollHeight;
		}
	}, [newestEntryId]);

	return (
		<div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto" aria-label="World activity">
			<div className="flex min-h-full flex-col justify-end">
				{entries.length ? (
					<ol className="space-y-1">
						{entries.map((entry) => (
							<WorldLogEntry key={entry.id} entry={entry} />
						))}
					</ol>
				) : (
					<p className="text-text-muted">The world awaits its next adventure.</p>
				)}
			</div>
		</div>
	);
}
