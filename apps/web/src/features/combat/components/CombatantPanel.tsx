import type { CombatantState } from "@app/engine";
import { ResourceBar } from "../../../components/ResourceBar";
import { ActiveEffectsRow } from "./ActiveEffectsRow";

type CombatantPanelProps = {
	combatant: CombatantState;
	identity: string;
	ariaLabel: string;
};

export function CombatantPanel({ combatant, identity, ariaLabel }: CombatantPanelProps) {
	return (
		<section className="grid gap-2" aria-label={ariaLabel}>
			<h2
				className="truncate text-base text-text-bright"
				title={`Level ${combatant.level} ${identity}`}
			>
				Level {combatant.level} <span className="text-primary">{identity}</span>
			</h2>
			<ResourceBar
				label="HP"
				value={`${combatant.currentHp}/${combatant.maxHp}`}
				tone="hp"
				fillPercent={(combatant.currentHp / combatant.maxHp) * 100}
			/>
			<ActiveEffectsRow
				effects={combatant.activeEffects}
				label={`${ariaLabel} active effects`}
			/>
		</section>
	);
}
