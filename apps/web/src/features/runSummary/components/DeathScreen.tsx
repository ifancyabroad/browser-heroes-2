import { useEffect, useRef } from "react";
import { selectRunSummaryView, type CombatLogEntry } from "@app/engine";
import { CLASSES_BY_ID } from "@app/content";
import type { RunView } from "@app/shared";
import { GameLayout } from "../../../components/GameLayout";
import { ButtonLink } from "../../../components/Button";

type DeathScreenProps = {
	run: RunView;
};

export function DeathScreen({ run }: DeathScreenProps) {
	const summary = selectRunSummaryView(run.state);
	const headingRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		headingRef.current?.focus();
	}, []);

	if (!summary) {
		return (
			<GameLayout>
				<div className="min-h-0 flex-1 overflow-y-auto bg-bg-base px-4 py-6 text-base text-text">
					<section className={getContentClassName("max-w-xl")}>
						<h1
							ref={headingRef}
							tabIndex={-1}
							className="text-base text-error outline-none"
						>
							YOU WERE SLAIN
						</h1>
						<p className="text-text-muted">
							The run has ended, and the road ahead belongs to another hero.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink variant="primary" to="/create-character">
								Try Again
							</ButtonLink>
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
			<div className="min-h-0 flex-1 overflow-y-auto bg-bg-base px-4 py-6 text-base text-text">
				<section className={getContentClassName("max-w-2xl")}>
					<header className="grid justify-items-center gap-3">
						<h1
							ref={headingRef}
							tabIndex={-1}
							className="text-base text-error outline-none"
						>
							YOU WERE SLAIN
						</h1>
						<p className="max-w-xl text-text-muted">
							The dungeon falls quiet. Your wounds are too deep, and your story ends
							in the dark.
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
							className="grid w-full max-w-xl gap-2 border-2 border-border bg-bg-panel p-3 text-left"
							aria-label="Final moments"
						>
							<h2 className="text-base text-info">Final Moments</h2>
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
						<ButtonLink to="/">Home</ButtonLink>
						<ButtonLink variant="primary" to="/create-character">
							Try Again
						</ButtonLink>
					</div>
				</section>
			</div>
		</GameLayout>
	);
}

function getContentClassName(maxWidth: string): string {
	return `mx-auto grid min-h-full w-full ${maxWidth} content-center justify-items-center gap-5 text-center`;
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
