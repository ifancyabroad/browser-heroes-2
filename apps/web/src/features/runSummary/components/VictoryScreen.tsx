import { useEffect, useRef } from "react";
import { CLASSES_BY_ID } from "@app/content";
import { selectRunSummaryView, type CombatLogEntry } from "@app/engine";
import type { RunView } from "@app/shared";
import { GameLayout } from "../../../components/GameLayout";
import { ButtonLink } from "../../../components/Button";
import { DailyChallengeResult } from "../../dailyChallenges";
import { ShareRunButton } from "./ShareRunButton";

type VictoryScreenProps = {
	run: RunView;
};

export function VictoryScreen({ run }: VictoryScreenProps) {
	const summary = selectRunSummaryView(run.state);
	const headingRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		headingRef.current?.focus();
	}, []);

	if (!summary || summary.status !== "retired") {
		return (
			<GameLayout>
				<div className="min-h-0 flex-1 overflow-y-auto bg-bg-base px-4 py-6 text-base text-text">
					<section className={getContentClassName("max-w-xl")}>
						<h1
							ref={headingRef}
							tabIndex={-1}
							className="text-base text-success outline-none"
						>
							RUN COMPLETE
						</h1>
						<p className="text-text-muted">
							The run has ended, and its tale is complete.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink variant="primary" to="/create-character">
								New Hero
							</ButtonLink>
						</div>
					</section>
				</div>
			</GameLayout>
		);
	}

	const heroClass = CLASSES_BY_ID[summary.hero.classId];
	const heroClassName = heroClass?.name ?? summary.hero.classId;
	const finalEnemy = summary.finalEnemy?.name ?? "the final boss";
	const finalMomentEntries = summary.finalMomentLog;
	const shareText = `${summary.hero.name} the ${heroClassName} defeated ${finalEnemy} and retired victorious in Browser Heroes 2. Can you do better?`;

	return (
		<GameLayout>
			<div className="min-h-0 flex-1 overflow-y-auto bg-bg-base px-4 py-6 text-base text-text">
				<section className={getContentClassName("max-w-2xl")}>
					<header className="grid justify-items-center gap-3">
						<h1
							ref={headingRef}
							tabIndex={-1}
							className="text-base text-success outline-none"
						>
							{summary.hero.name.toUpperCase()} RETIRED VICTORIOUS
						</h1>
						<p className="max-w-xl text-text-muted">
							The final foe has fallen. {summary.hero.name} has earned their rest, and
							their journey ends in triumph.
						</p>
					</header>

					<p className="max-w-xl">
						<span className="text-text-bright">
							{summary.hero.name} the {heroClassName}
						</span>{" "}
						retired victorious after defeating{" "}
						<span className="text-text-bright">{finalEnemy}</span>.
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

					{run.mode === "dailyChallenge" && run.dailyChallengeDate && (
						<DailyChallengeResult date={run.dailyChallengeDate} outcome="retired" />
					)}

					<ShareRunButton title={`${summary.hero.name}'s victory`} text={shareText} />

					<nav className="flex flex-wrap justify-center gap-4" aria-label="Run links">
						<ButtonLink to="/">Home</ButtonLink>
						<ButtonLink variant="primary" to="/create-character">
							New Hero
						</ButtonLink>
					</nav>
				</section>
			</div>
		</GameLayout>
	);
}

function getContentClassName(maxWidth: string): string {
	return `mx-auto grid min-h-full w-full ${maxWidth} content-center justify-items-center gap-5 text-center`;
}

function getLogEntryClassName(entry: CombatLogEntry): string {
	if (entry.actor === "player") {
		return "text-text-bright";
	}

	if (entry.actor === "system") {
		return "text-text-muted";
	}

	return "text-text";
}
