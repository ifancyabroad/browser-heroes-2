import { Link } from "react-router-dom";
import { selectRunSummaryView, type CombatLogEntry } from "@app/engine";
import { CLASSES_BY_ID } from "@app/content";
import type { RunView } from "@app/shared";
import { GameLayout } from "../../../components/GameLayout";

type DeathScreenProps = {
	run: RunView;
};

export function DeathScreen({ run }: DeathScreenProps) {
	const summary = selectRunSummaryView(run.state);

	if (!summary) {
		return (
			<GameLayout>
				<div className="flex min-h-0 flex-1 items-center justify-center bg-bg-base px-4 text-base text-text">
					<section className="grid w-full max-w-xl justify-items-center gap-6 text-center">
						<h1 className="text-base uppercase tracking-widest text-error">
							You were slain
						</h1>
						<p className="text-text-muted">
							The run has ended, and the road ahead belongs to another hero.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link
								className="text-text-bright underline hover:opacity-80"
								to="/create-character"
							>
								Create Character
							</Link>
						</div>
					</section>
				</div>
			</GameLayout>
		);
	}

	const heroClassName = CLASSES_BY_ID[summary.hero.classId]?.name ?? summary.hero.classId;
	const slainBy = summary.finalEnemy?.name ?? "Unknown enemy";
	const finalMomentEntries = summary.finalMomentLog;

	return (
		<GameLayout>
			<div className="flex min-h-0 flex-1 items-center justify-center bg-bg-base px-4 py-6 text-base text-text">
				<section className="grid w-full max-w-2xl justify-items-center gap-6 text-center">
					<header className="grid justify-items-center gap-3">
						<p className="uppercase tracking-widest text-error">You were slain</p>
						<p className="max-w-xl text-text-muted">
							The dungeon falls quiet. Your wounds are too deep, your pack too heavy,
							and your story ends in the dark.
						</p>
					</header>

					<p className="max-w-xl">
						<span className="text-text-bright">
							{summary.hero.name} the {heroClassName}
						</span>{" "}
						was felled by <span className="text-text-bright">{slainBy}</span> on battle{" "}
						<span className="text-text-bright">{summary.battleNumber}</span>.
					</p>

					{finalMomentEntries.length > 0 && (
						<section
							className="grid max-w-xl gap-2 text-center"
							aria-label="Final moments"
						>
							<h2 className="text-base text-text-label">Final Moments</h2>
							<div className="grid gap-1">
								{finalMomentEntries.map((entry) => (
									<p key={entry.id} className={getLogEntryClassName(entry)}>
										{entry.message}
									</p>
								))}
							</div>
						</section>
					)}

					<div className="flex flex-wrap justify-center gap-4">
						<Link
							className="text-text-bright underline hover:opacity-80"
							to="/create-character"
						>
							Create Character
						</Link>
						<Link
							className="text-primary underline hover:opacity-80"
							to={`/runs/${run.id}/summary`}
						>
							View Run Summary
						</Link>
					</div>
				</section>
			</div>
		</GameLayout>
	);
}

function getLogEntryClassName(entry: CombatLogEntry): string {
	if (entry.actor === "enemy") {
		return "text-text-bright";
	}

	if (entry.actor === "system") {
		return "text-text-muted";
	}

	return "text-text";
}
