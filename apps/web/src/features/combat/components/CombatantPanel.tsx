import type { CombatantState } from "@app/engine";
import clsx from "clsx";
import { ResourceBar } from "../../../components/ResourceBar";
import { Badge } from "../../../components/Badge";
import { ActiveEffectsRow } from "./ActiveEffectsRow";
import styles from "./CombatantPanel.module.css";

type CombatantPanelProps = {
	combatant: CombatantState;
	identity: string;
	ariaLabel: string;
	descriptor?: string;
	statusLabel?: string;
};

export function CombatantPanel({
	combatant,
	identity,
	ariaLabel,
	descriptor,
	statusLabel,
}: CombatantPanelProps) {
	const title = `${identity} / Level ${combatant.level}${descriptor ? ` / ${descriptor}` : ""}${statusLabel ? ` ${statusLabel}` : ""}`;

	return (
		<section className="grid w-full max-w-[22rem] gap-2" aria-label={ariaLabel}>
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
				{statusLabel && (
					<Badge
						label={statusLabel}
						className={clsx("shrink-0 leading-5 text-error", styles.statusLabel)}
					/>
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
