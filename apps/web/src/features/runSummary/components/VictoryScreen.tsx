import { CLASSES_BY_ID } from "@app/content";
import { selectRunSummaryView, type CombatLogEntry } from "@app/engine";
import type { RunView } from "@app/shared";
import { Card } from "../../../components/Card";
import { GameLayout } from "../../../components/GameLayout";
import { ButtonLink } from "../../../components/Button";
import { DailyChallengeResultLink } from "../../dailyChallenges";

type VictoryScreenProps = {
	run: RunView;
};

export function VictoryScreen({ run }: VictoryScreenProps) {
	const summary = selectRunSummaryView(run.state);

	if (!summary || summary.status !== "retired") {
		return (
			<GameLayout>
				<div className="flex min-h-0 flex-1 items-center justify-center bg-bg-base px-4 text-base text-text">
					<Card
						title="RUN COMPLETE"
						className="w-full max-w-xl text-center"
						contentClassName="grid justify-items-center gap-4 px-4 pb-4 pt-6"
					>
						<h1 className="text-base text-success">Victory</h1>
						<p className="text-text-muted">
							The run has ended, and its tale is complete.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink variant="primary" to="/create-character">
								New Hero
							</ButtonLink>
						</div>
					</Card>
				</div>
			</GameLayout>
		);
	}

	const heroClass = CLASSES_BY_ID[summary.hero.classId];
	const heroClassName = heroClass?.name ?? summary.hero.classId;
	const finalEnemy = summary.finalEnemy?.name ?? "the final boss";
	const finalMomentEntries = summary.finalMomentLog;

	return (
		<GameLayout>
			<div className="min-h-0 flex-1 overflow-y-auto bg-bg-base px-4 py-6 text-base text-text">
				<section className="mx-auto grid min-h-full w-full max-w-3xl content-center gap-6">
					<Card title="RUN COMPLETE" contentClassName="grid gap-5 px-4 pb-4 pt-6">
						<header className="grid gap-3 border-b-2 border-border pb-4 text-center">
							<p className="text-success">Victory</p>
							<h1 className="text-base text-primary">The Ladder Is Broken</h1>
							<p className="mx-auto max-w-2xl text-text-muted">
								The final foe has fallen. The world beyond battle 100 waits, but{" "}
								{summary.hero.name} has earned their rest.
							</p>
						</header>

						<section className="grid gap-3 text-center">
							<p>
								<span className="text-text-bright">
									{summary.hero.name} the {heroClassName}
								</span>{" "}
								retired victorious after defeating{" "}
								<span className="text-text-bright">{finalEnemy}</span>.
							</p>
							<div className="grid gap-2 sm:grid-cols-4">
								<SummaryStat label="Level" value={summary.hero.level} />
								<SummaryStat label="Battle" value={summary.battleNumber} />
								<SummaryStat label="Gold" value={summary.gold} />
								<SummaryStat label="Streak" value={summary.streak} />
							</div>
						</section>

						{finalMomentEntries.length > 0 && (
							<section
								className="grid gap-3 border-2 border-border bg-bg-panel p-3"
								aria-label="Final moments"
							>
								<h2 className="text-text-bright">Final Moments</h2>
								<div className="grid gap-1">
									{finalMomentEntries.map((entry) => (
										<p key={entry.id} className={getLogEntryClassName(entry)}>
											{entry.message}
										</p>
									))}
								</div>
							</section>
						)}

						<nav className="flex flex-wrap justify-center gap-4" aria-label="Run links">
							<ButtonLink to="/">Home</ButtonLink>
							{run.mode === "dailyChallenge" && run.dailyChallengeDate && (
								<DailyChallengeResultLink date={run.dailyChallengeDate} />
							)}
							<ButtonLink variant="primary" to="/create-character">
								New Hero
							</ButtonLink>
						</nav>
					</Card>
				</section>
			</div>
		</GameLayout>
	);
}

type SummaryStatProps = {
	label: string;
	value: number;
};

function SummaryStat({ label, value }: SummaryStatProps) {
	return (
		<div className="grid gap-1 border-2 border-border bg-bg-panel p-3 text-center">
			<span className="text-text-label">{label}</span>
			<span className="text-text-bright">{value}</span>
		</div>
	);
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
