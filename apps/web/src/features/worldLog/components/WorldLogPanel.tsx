import type { WorldLogEntry as Entry } from "@app/shared";
import { useId, useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { IconButton } from "../../../components/Button";
import { WorldLogList } from "./WorldLogList";

type WorldLogPanelProps = { entries: Entry[]; pending: boolean; error: boolean };

export function WorldLogPanel({ entries, pending, error }: WorldLogPanelProps) {
	const [expanded, setExpanded] = useState(false);
	const contentId = useId();
	return (
		<div className="relative h-13 shrink-0">
			<section
				aria-label="World Log"
				className="absolute inset-x-0 bottom-0 z-30 flex items-end gap-3 bg-bg-base p-2"
			>
				<div
					id={contentId}
					className={
						expanded
							? "flex h-48 min-w-0 flex-1 flex-col"
							: "min-w-0 flex-1 self-center"
					}
				>
					{entries.length === 0 && (pending || error) ? (
						<p role="status">
							{pending ? "Loading activity..." : "World log unavailable."}
						</p>
					) : (
						<WorldLogList entries={entries} compact={!expanded} />
					)}
				</div>
				<IconButton
					type="button"
					aria-label={expanded ? "Collapse world log" : "Expand world log"}
					aria-expanded={expanded}
					aria-controls={contentId}
					className="shrink-0"
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? (
						<IconChevronDown className="size-6" aria-hidden="true" />
					) : (
						<IconChevronUp className="size-6" aria-hidden="true" />
					)}
				</IconButton>
			</section>
		</div>
	);
}
