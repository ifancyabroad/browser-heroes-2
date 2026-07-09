import type { CombatantState } from "@app/engine";
import clsx from "clsx";
import { ResourceBar } from "../../../components/ResourceBar";
import { ActiveEffectsRow } from "./ActiveEffectsRow";
import styles from "./CombatantPanel.module.css";

type CombatantPanelProps = {
	combatant: CombatantState;
	identity: string;
	ariaLabel: string;
	statusLabel?: string;
};

export function CombatantPanel({
	combatant,
	identity,
	ariaLabel,
	statusLabel,
}: CombatantPanelProps) {
	const title = `${identity}${statusLabel ? ` ${statusLabel}` : ""} / Level ${combatant.level}`;

	return (
		<section className="grid gap-2" aria-label={ariaLabel}>
			<h2 className="flex min-w-0 items-center gap-2 text-base" title={title}>
				<span className="min-w-0 truncate">
					<span className="text-primary">{identity}</span> / Level {combatant.level}
				</span>
				{statusLabel && (
					<span
						className={clsx(
							"shrink-0 text-error before:text-text-muted before:content-['['] after:text-text-muted after:content-[']']",
							styles.statusLabel,
						)}
					>
						{statusLabel}
					</span>
				)}
			</h2>
			<ResourceBar
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
