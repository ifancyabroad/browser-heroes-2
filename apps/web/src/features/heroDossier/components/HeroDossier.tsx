import { CLASSES_BY_ID } from "@app/content";
import { selectHeroView, type HeroView } from "@app/engine";
import type { RunHeroView } from "@app/shared";
import { AbilitiesSection, EquipmentSection } from "./HeroDossierBuild";
import { AttributesSection, CombatSection } from "./HeroDossierStats";

export function HeroDossier({ view }: { view: RunHeroView }) {
	const hero = selectHeroView(view.hero);
	const heroClass = CLASSES_BY_ID[hero.classId];

	return (
		<article className="grid gap-5">
			<HeroHeader view={view} hero={hero} className={heroClass.name} />
			<div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.15fr)_minmax(0,1.15fr)]">
				<div className="grid items-start gap-5 bg-bg-panel px-4 py-4">
					<AttributesSection hero={hero} />
					<CombatSection hero={hero} />
				</div>
				<EquipmentSection hero={hero} />
				<AbilitiesSection hero={hero} />
			</div>
		</article>
	);
}

function HeroHeader({
	view,
	hero,
	className,
}: {
	view: RunHeroView;
	hero: HeroView;
	className: string;
}) {
	const journey = [
		{ label: "Battle", value: view.run.battleNumber },
		{ label: "Kills", value: view.run.kills },
		{ label: "Day", value: view.run.day },
		...(view.run.endlessCycle > 0 ? [{ label: "Cycle", value: view.run.endlessCycle }] : []),
	];

	return (
		<header className="grid gap-3 bg-bg-panel px-4 py-4 text-center sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:text-left">
			<div className="grid gap-1">
				<p className="text-primary">
					{hero.name} the {className}
				</p>
				<p className="text-text-bright">Level {hero.level}</p>
				<p className={view.run.status === "dead" ? "text-error" : "text-success"}>
					{getOutcome(view)}
				</p>
			</div>
			<dl className="flex flex-wrap justify-center gap-x-5 gap-y-1 sm:max-w-72 sm:justify-end">
				{journey.map((item) => (
					<div key={item.label} className="flex gap-2">
						<dt className="text-text-label">{item.label}</dt>
						<dd className="text-text-bright tabular-nums">{item.value}</dd>
					</div>
				))}
			</dl>
		</header>
	);
}

function getOutcome(view: RunHeroView) {
	if (view.run.status === "retired") {
		return view.run.hasDefeatedFinalBoss ? "Retired victorious" : "Retired";
	}

	return view.run.slainBy ? `Slain by ${view.run.slainBy.name}` : "Fell in battle";
}
