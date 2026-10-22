import type { WorldLogEntry } from "@app/shared";
import { LogPanel } from "../../../components/LogPanel";
import { WorldLogList } from "./WorldLogList";

type WorldLogPanelProps = { entries: WorldLogEntry[]; pending: boolean; error: boolean };

export function WorldLogPanel({ entries, pending, error }: WorldLogPanelProps) {
	return (
		<LogPanel title="World Log">
			{pending && (
				<p className="mt-auto" role="status">
					Loading activity...
				</p>
			)}
			{error && entries.length === 0 && (
				<p className="mt-auto" role="status">
					World log unavailable.
				</p>
			)}
			{(entries.length > 0 || (!pending && !error)) && <WorldLogList entries={entries} />}
		</LogPanel>
	);
}
