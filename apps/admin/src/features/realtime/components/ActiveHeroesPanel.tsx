import { CLASSES_BY_ID } from "@app/content";
import type { AdminActiveHero } from "@app/shared";

export function ActiveHeroesPanel({
	heroes,
	updatedAt,
	pending,
	error,
	selectedRunId,
	onSelect,
	onRetry,
}: {
	heroes: AdminActiveHero[] | undefined;
	updatedAt: number;
	pending: boolean;
	error: boolean;
	selectedRunId: string | undefined;
	onSelect: (hero: { runId: string; name: string }) => void;
	onRetry: () => void;
}) {
	return (
		<section className="panel" aria-labelledby="heroes-title">
			<div className="panel-heading">
				<h2 id="heroes-title">Recently active heroes</h2>
				<p>
					Active within 5 minutes
					{updatedAt > 0 && (
						<>
							{" "}
							·{" "}
							<time
								dateTime={new Date(updatedAt).toISOString()}
								title={new Date(updatedAt).toLocaleString()}
							>
								Updated {new Date(updatedAt).toLocaleTimeString()}
							</time>
						</>
					)}
				</p>
			</div>
			{pending && <p>Loading heroes…</p>}
			{error && (
				<p role="alert">
					Could not refresh heroes. <button onClick={onRetry}>Retry heroes</button>
				</p>
			)}
			{heroes?.length === 0 && <p className="muted">No recently active heroes.</p>}
			<table className="realtime-heroes" aria-labelledby="heroes-title">
				{!selectedRunId && (
					<caption className="muted">Select a hero to follow their activity.</caption>
				)}
				<thead>
					<tr>
						<th>Hero</th>
						<th>Progress</th>
					</tr>
				</thead>
				<tbody>
					{heroes?.map((hero) => (
						<tr
							key={hero.runId}
							className={selectedRunId === hero.runId ? "selected-hero" : ""}
						>
							<td>
								<button
									className="hero-name"
									aria-pressed={selectedRunId === hero.runId}
									onClick={() =>
										onSelect({
											runId: hero.runId,
											name: hero.heroName,
										})
									}
								>
									{hero.heroName}
								</button>
								<small>
									{CLASSES_BY_ID[hero.classId].name}
									{hero.displayName && <> · {hero.displayName}</>}
								</small>
								<small>
									{hero.mode === "normal" ? "Normal" : "Daily Challenge"}
								</small>
							</td>
							<td>
								Level {hero.level} · battle {hero.battleNumber}
								<small>
									{hero.zone.charAt(0).toUpperCase() + hero.zone.slice(1)}
								</small>
								<small>
									Active{" "}
									<time
										dateTime={hero.lastActivityAt}
										title={new Date(hero.lastActivityAt).toLocaleString()}
									>
										{formatActivityAge(hero.lastActivityAt, updatedAt)}
									</time>
								</small>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

function formatActivityAge(lastActivityAt: string, now: number): string {
	const seconds = Math.max(0, Math.floor((now - new Date(lastActivityAt).getTime()) / 1000));
	return seconds < 60 ? `${seconds}s ago` : `${Math.floor(seconds / 60)}m ago`;
}
