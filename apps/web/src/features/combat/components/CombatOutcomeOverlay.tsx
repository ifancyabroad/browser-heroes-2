import { useEffect, useRef, useState } from "react";
import type { CombatLogEntry, CombatLogOutcome } from "@app/engine";
import { getDamageTypeTextClass } from "../../../presentation/damage";
import styles from "./CombatOutcomeOverlay.module.css";

const COMBAT_OUTCOME_FEEDBACK_MS = 1_000;

type CombatOutcomeOverlayProps = {
	enemyId: string;
	entries: CombatLogEntry[];
};

export function CombatOutcomeOverlay({ enemyId, entries }: CombatOutcomeOverlayProps) {
	const timeout = useRef<number | null>(null);
	const nextBatchId = useRef(1);
	const previousEnemyId = useRef(enemyId);
	const processedEntryIds = useRef(new Set(entries.map((entry) => entry.id)));
	const [visibleBatch, setVisibleBatch] = useState<{
		id: number;
		outcomes: CombatLogOutcome[];
	} | null>(null);

	useEffect(() => {
		return () => {
			if (timeout.current !== null) {
				window.clearTimeout(timeout.current);
			}
		};
	}, []);

	useEffect(() => {
		if (previousEnemyId.current !== enemyId) {
			previousEnemyId.current = enemyId;
			processedEntryIds.current = new Set(entries.map((entry) => entry.id));
			setVisibleBatch(null);

			if (timeout.current !== null) {
				window.clearTimeout(timeout.current);
				timeout.current = null;
			}
			return;
		}

		const newEntries = entries.filter((entry) => !processedEntryIds.current.has(entry.id));

		for (const entry of newEntries) {
			processedEntryIds.current.add(entry.id);
		}

		const enemyOutcomes = groupEnemyOutcomes(newEntries, enemyId);

		if (enemyOutcomes.length === 0) {
			return;
		}

		if (timeout.current !== null) {
			window.clearTimeout(timeout.current);
		}

		setVisibleBatch({ id: nextBatchId.current, outcomes: enemyOutcomes });
		nextBatchId.current += 1;
		timeout.current = window.setTimeout(() => {
			setVisibleBatch(null);
			timeout.current = null;
		}, COMBAT_OUTCOME_FEEDBACK_MS);
	}, [enemyId, entries]);

	if (!visibleBatch) {
		return null;
	}

	return (
		<div
			key={visibleBatch.id}
			className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center ${styles.overlay}`}
			aria-hidden="true"
		>
			<div className="flex flex-col items-center text-center font-bold drop-shadow-[2px_2px_0_var(--color-bg-base)]">
				{visibleBatch.outcomes.map((outcome, index) => (
					<CombatOutcomeText key={`${outcome.type}-${index}`} outcome={outcome} />
				))}
			</div>
		</div>
	);
}

function groupEnemyOutcomes(entries: CombatLogEntry[], enemyId: string): CombatLogOutcome[] {
	const groupedOutcomes: CombatLogOutcome[] = [];
	const damageGroupIndexes = new Map<string, number>();

	for (const entry of entries) {
		const outcome = entry.outcome;

		if (!outcome || outcome.targetId !== enemyId) {
			continue;
		}

		if (outcome.type === "miss") {
			groupedOutcomes.push(outcome);
			continue;
		}

		const groupKey = `${entry.eventType}:${outcome.damageType}`;
		const groupIndex = damageGroupIndexes.get(groupKey);

		if (groupIndex === undefined) {
			damageGroupIndexes.set(groupKey, groupedOutcomes.length);
			groupedOutcomes.push(outcome);
			continue;
		}

		const existing = groupedOutcomes[groupIndex];

		if (existing.type !== "damage") {
			throw new Error(`Damage outcome group ${groupKey} contains a non-damage outcome`);
		}

		groupedOutcomes[groupIndex] = {
			...existing,
			hpDamage: existing.hpDamage + outcome.hpDamage,
			absorbedDamage: existing.absorbedDamage + outcome.absorbedDamage,
			affinity:
				existing.affinity === "immune" && outcome.affinity === "immune"
					? "immune"
					: "normal",
			critical: existing.critical || outcome.critical,
			halfDamageSave: existing.halfDamageSave || outcome.halfDamageSave,
		};
	}

	return groupedOutcomes;
}

function CombatOutcomeText({ outcome }: { outcome: CombatLogOutcome }) {
	if (outcome.type === "miss") {
		return <p className="text-error">MISS</p>;
	}

	const damageType = outcome.damageType.toUpperCase();
	const damageTypeClass = getDamageTypeTextClass(outcome.damageType);
	const sizeStep = Math.max(0, Math.floor(Math.log2(Math.max(1, outcome.hpDamage) / 10)) + 1);
	const style = { fontSize: `${1 + sizeStep * 0.25}rem` };

	if (outcome.affinity === "immune") {
		return (
			<p className={damageTypeClass} style={{ fontSize: "1rem" }}>
				IMMUNE: {damageType}
			</p>
		);
	}

	return (
		<p className={damageTypeClass} style={style}>
			{outcome.hpDamage > 0 ? `-${outcome.hpDamage}` : "0"} {damageType}
			{outcome.critical && <span className="text-legendary"> CRIT</span>}
			{outcome.absorbedDamage > 0 && (
				<span className="text-text-muted"> ({outcome.absorbedDamage} BLOCKED)</span>
			)}
		</p>
	);
}
