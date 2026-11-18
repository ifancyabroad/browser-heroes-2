import { CLASSES_BY_ID } from "@app/content";
import { selectHeroProgression, selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { ResourceBar } from "../../../components/ResourceBar";
import { getXpResource } from "../../../presentation/resources";
import { ActiveEffectsRow } from "../../combat/components/ActiveEffectsRow";

export function HeroSummary({ run }: { run: RunView }) {
	const { state } = run;
	const hero = selectHeroView(state.hero);
	const heroClass = CLASSES_BY_ID[hero.classId];
	const health = state.combat?.player ?? hero.health;
	const xp = getXpResource(selectHeroProgression(state));

	return (
		<section className="grid min-w-0 gap-2" aria-label="Hero summary">
			<h2
				className="truncate"
				title={`${hero.name} the ${heroClass.name} / Level ${hero.level}`}
			>
				<span className="text-primary">
					{hero.name} the {heroClass.name}
				</span>
				{" / "}Level {hero.level}
			</h2>
			<section className="grid gap-2" aria-label="Hero resources">
				<ResourceBar
					label="HP"
					value={`${health.currentHp}/${health.maxHp}`}
					tone="hp"
					fillPercent={(health.currentHp / health.maxHp) * 100}
					animateChanges={state.combat !== null}
				/>
				<ResourceBar label="XP" value={xp.value} tone="xp" fillPercent={xp.fillPercent} />
				{state.combat && (
					<ActiveEffectsRow
						effects={state.combat.player.activeEffects}
						label="Hero active effects"
					/>
				)}
			</section>
		</section>
	);
}
