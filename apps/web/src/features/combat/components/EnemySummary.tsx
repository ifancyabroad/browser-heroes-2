import type { CombatantState } from "@app/engine";
import { ResourceBar } from "../../../components/ResourceBar";
import { ActiveEffectsRow } from "./ActiveEffectsRow";

type EnemySummaryProps = {
	enemy: CombatantState;
	descriptor?: string;
};

export function EnemySummary({ enemy, descriptor }: EnemySummaryProps) {
	const title = `${enemy.name} / Level ${enemy.level}${descriptor ? ` / ${descriptor}` : ""}`;

	return (
		<section className="grid min-w-0 content-start gap-2" aria-label="Enemy">
			<h2 className="truncate" title={title}>
				<span className="text-text-bright">{enemy.name}</span> / Level {enemy.level}
				{descriptor && (
					<>
						{" / "}
						<span className="text-secondary">{descriptor}</span>
					</>
				)}
			</h2>
			<ResourceBar
				className="md:max-w-80"
				label="HP"
				value={`${enemy.currentHp}/${enemy.maxHp}`}
				tone="hp"
				fillPercent={(enemy.currentHp / enemy.maxHp) * 100}
				animateChanges
			/>
			<ActiveEffectsRow effects={enemy.activeEffects} label="Enemy active effects" />
		</section>
	);
}
