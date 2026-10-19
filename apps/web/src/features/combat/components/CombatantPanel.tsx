import type { CombatantState } from "@app/engine";
import { ResourceBar } from "../../../components/ResourceBar";
import { ActiveEffectsRow } from "./ActiveEffectsRow";

type CombatantPanelProps = {
	combatant: CombatantState;
	identity: string;
	ariaLabel: string;
	descriptor?: string;
};

export function CombatantPanel({
	combatant,
	identity,
	ariaLabel,
	descriptor,
}: CombatantPanelProps) {
	const title = `${identity} / Level ${combatant.level}${descriptor ? ` / ${descriptor}` : ""}`;

	return (
		<section className="grid w-full min-w-0 gap-2" aria-label={ariaLabel}>
			<h2 className="flex min-w-0 items-center gap-2 text-base" title={title}>
				<span className="min-w-0 truncate">
					<span className="text-primary">{identity}</span> / Level {combatant.level}
					{descriptor && (
						<>
							{" / "}
							<span className="text-secondary">{descriptor}</span>
						</>
					)}
				</span>
			</h2>
			<ResourceBar
				className="w-full lg:max-w-[22rem]"
				label="HP"
				value={`${combatant.currentHp}/${combatant.maxHp}`}
				tone="hp"
				fillPercent={(combatant.currentHp / combatant.maxHp) * 100}
				animateChanges
			/>
			<ActiveEffectsRow
				effects={combatant.activeEffects}
				label={`${ariaLabel} active effects`}
			/>
		</section>
	);
}
