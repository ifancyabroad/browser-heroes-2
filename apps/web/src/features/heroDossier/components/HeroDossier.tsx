import { CLASSES_BY_ID, type Class } from "@app/content";
import { selectHeroView, type HeroView } from "@app/engine";
import type { RunHeroView } from "@app/shared";
import classBackground from "../../../assets/images/backgrounds/bg_07.png";
import { resolveImageUrl } from "../../../utils/image";
import { AbilitiesSection, EquipmentSection } from "./HeroDossierBuild";
import { AttributesSection, CombatSection, DamageSection } from "./HeroDossierStats";

export function HeroDossier({ view }: { view: RunHeroView }) {
	const hero = selectHeroView(view.hero);
	const heroClass = CLASSES_BY_ID[hero.classId];

	return (
		<article className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-[16rem_10.5rem_minmax(0,1fr)_minmax(0,1fr)]">
			<HeroHeader view={view} hero={hero} heroClass={heroClass} />
			<div className="grid min-w-0 items-start gap-5">
				<AttributesSection hero={hero} />
				<CombatSection hero={hero} />
				<DamageSection hero={hero} />
			</div>
			<div className="grid min-w-0 items-start gap-5 sm:col-span-2 sm:grid-cols-2 xl:contents">
				<EquipmentSection hero={hero} />
				<AbilitiesSection hero={hero} />
			</div>
		</article>
	);
}

function HeroHeader({
	view,
	hero,
	heroClass,
}: {
	view: RunHeroView;
	hero: HeroView;
	heroClass: Class;
}) {
	const journey = [
		{ label: "Kills", value: view.run.kills },
		{ label: "Day", value: view.run.day },
	];

	return (
		<header className="grid min-w-0 gap-3 text-center">
			<div className="grid gap-1">
				<p className="min-w-0 wrap-anywhere">
					<span className="text-primary">{hero.name}</span>
					{view.displayName && <span className="text-info"> ({view.displayName})</span>}
				</p>
				<p className="text-text-bright">
					Level {hero.level} {heroClass.name}
				</p>
				<p
					className={`wrap-anywhere ${view.run.status === "dead" ? "text-error" : "text-success"}`}
				>
					{getOutcome(view)}
				</p>
			</div>
			<dl className="flex flex-wrap justify-center gap-x-5 gap-y-1" aria-label="Journey">
				{journey.map((item) => (
					<div key={item.label} className="flex gap-2">
						<dt className="text-text-label">{item.label}</dt>
						<dd className="text-text-bright tabular-nums">{item.value}</dd>
					</div>
				))}
			</dl>
			<div
				className="flex h-56 justify-center overflow-hidden bg-cover bg-bottom sm:h-96"
				style={{ backgroundImage: `url(${classBackground})` }}
			>
				<img
					src={resolveImageUrl(heroClass.portrait)}
					alt={`${heroClass.name} class portrait`}
					className="h-full w-auto max-w-none shrink-0"
				/>
			</div>
		</header>
	);
}

function getOutcome(view: RunHeroView) {
	if (view.run.status === "retired") {
		return view.run.hasDefeatedFinalBoss ? "Retired victorious" : "Retired";
	}

	return view.run.slainBy ? `Slain by ${view.run.slainBy.name}` : "Fell in battle";
}
