import { useState } from "react";
import type { RunMode } from "@app/shared";
import { ActivityPanel, ActiveHeroesPanel, useRealtime } from "../features/realtime";

export function RealtimePage() {
	const [mode, setMode] = useState<RunMode | "all">("all");
	const [selected, setSelected] = useState<{ runId: string; name: string } | null>(null);
	const { entries, status, pending, error, retry, heroes } = useRealtime(mode);
	return (
		<main className="dashboard realtime-page">
			<div className="realtime-toolbar">
				<label>
					Run mode
					<select
						value={mode}
						onChange={(event) => setMode(event.target.value as RunMode | "all")}
					>
						<option value="all">All modes</option>
						<option value="normal">Normal</option>
						<option value="dailyChallenge">Daily Challenge</option>
					</select>
				</label>
				<div className="realtime-connection">
					<span
						role="status"
						className={status === "Connected" ? "activity-success" : "muted"}
					>
						{status}
					</span>
					<button onClick={retry}>Refresh</button>
				</div>
			</div>
			<div className="realtime-grid">
				<ActivityPanel
					entries={entries}
					mode={mode}
					selected={selected}
					pending={pending}
					error={error}
					retry={retry}
					onClearHero={() => setSelected(null)}
				/>
				<ActiveHeroesPanel
					heroes={heroes.data?.heroes}
					updatedAt={heroes.dataUpdatedAt}
					pending={heroes.isPending}
					error={heroes.isError}
					selectedRunId={selected?.runId}
					onSelect={setSelected}
					onRetry={() => void heroes.refetch()}
				/>
			</div>
		</main>
	);
}
