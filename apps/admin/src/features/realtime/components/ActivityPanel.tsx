import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { CLASSES_BY_ID } from "@app/content";
import type { AdminActivityEntry, RunMode } from "@app/shared";
import {
	activityGroup,
	activityGroups,
	describeActivity,
	type ActivityGroup,
} from "../utils/activityPresentation";

export function ActivityPanel({
	entries,
	mode,
	selected,
	pending,
	error,
	retry,
	onClearHero,
}: {
	entries: AdminActivityEntry[];
	mode: RunMode | "all";
	selected: { runId: string; name: string } | null;
	pending: boolean;
	error: boolean;
	retry: () => void;
	onClearHero: () => void;
}) {
	const [groups, setGroups] = useState<readonly ActivityGroup[]>(activityGroups);
	const [frozen, setFrozen] = useState<AdminActivityEntry[] | null>(null);
	const [atTop, setAtTop] = useState(true);
	const scroll = useRef<HTMLDivElement>(null);
	const follow = useRef(true);
	const displayed = useMemo(
		() =>
			(frozen ?? entries)
				.filter(
					(entry) =>
						(mode === "all" || entry.mode === mode) &&
						groups.includes(activityGroup(entry.event)) &&
						(!selected || entry.runId === selected.runId),
				)
				.reverse(),
		[entries, frozen, mode, groups, selected],
	);
	useLayoutEffect(() => {
		if (follow.current && scroll.current) {
			scroll.current.scrollTop = 0;
		}
	}, [displayed]);
	function jump() {
		follow.current = true;
		setAtTop(true);
		if (scroll.current) {
			scroll.current.scrollTop = 0;
		}
	}

	return (
		<section className="panel" aria-labelledby="activity-title">
			<div className="panel-heading realtime-heading">
				<div>
					<h2 id="activity-title">Live activity</h2>
					<p>Latest 500 events · recent history only</p>
				</div>
				<button
					aria-pressed={frozen !== null}
					onClick={() => {
						if (frozen) {
							follow.current = true;
							setAtTop(true);
							setFrozen(null);
						} else {
							setFrozen(entries);
						}
					}}
				>
					{frozen ? "Resume" : "Pause"}
				</button>
			</div>
			<fieldset className="activity-filters">
				<legend>Events</legend>
				{activityGroups.map((group) => (
					<label key={group}>
						<input
							type="checkbox"
							checked={groups.includes(group)}
							onChange={() =>
								setGroups((current) =>
									current.includes(group)
										? current.filter((value) => value !== group)
										: [...current, group],
								)
							}
						/>
						{group}
					</label>
				))}
			</fieldset>
			{selected && (
				<button
					className="realtime-selection"
					aria-label={`Clear hero filter for ${selected.name}`}
					onClick={onClearHero}
				>
					<span>Following {selected.name}</span>
					<span aria-hidden="true">×</span>
				</button>
			)}
			{frozen && (
				<p className="muted">Feed paused. New activity continues in the background.</p>
			)}
			{error && (
				<p role="alert">
					Could not refresh activity. <button onClick={retry}>Retry activity</button>
				</p>
			)}
			{pending && <p>Loading activity…</p>}
			{!atTop && (
				<button className="jump-latest" onClick={jump}>
					Back to latest
				</button>
			)}
			<div
				className="activity-scroll"
				ref={scroll}
				tabIndex={0}
				aria-label="Activity feed"
				onScroll={() => {
					const element = scroll.current!;
					follow.current = element.scrollTop < 40;
					setAtTop(follow.current);
				}}
			>
				{!pending && displayed.length === 0 && (
					<p className="muted">No recent activity matches these filters.</p>
				)}
				<ol className="activity-list">
					{displayed.map((entry) => {
						const description = describeActivity(entry.event);
						return (
							<li key={entry.id} className={description.tone}>
								<time
									dateTime={entry.createdAt}
									title={new Date(entry.createdAt).toLocaleString()}
								>
									{new Date(entry.createdAt).toLocaleTimeString()}
								</time>
								<div>
									<strong>{entry.heroName}</strong> {description.text}
									<small>
										{CLASSES_BY_ID[entry.classId].name}
										{entry.displayName && <> · {entry.displayName}</>} ·{" "}
										{entry.mode === "normal" ? "Normal" : "Daily Challenge"}
									</small>
								</div>
							</li>
						);
					})}
				</ol>
			</div>
		</section>
	);
}
