import { useEffect, useRef, useState } from "react";
import type { CombatLogEntry, CombatLogOutcome } from "@app/engine";
import { CombatOutcomeText } from "./CombatOutcomeText";
import styles from "./CombatOutcomeOverlay.module.css";

const COMBAT_OUTCOME_FEEDBACK_MS = 1_000;

type CombatOutcomeOverlayProps = {
	enemyId: string;
	heroId: string;
	entries: CombatLogEntry[];
};

export function CombatOutcomeOverlay({ enemyId, heroId, entries }: CombatOutcomeOverlayProps) {
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

		if (newEntries.length === 0) {
			return;
		}

		const outcomes = prepareCombatFeedback(newEntries, enemyId, heroId);

		if (timeout.current !== null) {
			window.clearTimeout(timeout.current);
			timeout.current = null;
		}

		if (outcomes.length === 0) {
			setVisibleBatch(null);
			return;
		}

		setVisibleBatch({ id: nextBatchId.current, outcomes });
		nextBatchId.current += 1;
		timeout.current = window.setTimeout(() => {
			setVisibleBatch(null);
			timeout.current = null;
		}, COMBAT_OUTCOME_FEEDBACK_MS);
	}, [enemyId, heroId, entries]);

	if (!visibleBatch) {
		return null;
	}

	return (
		<div
			key={visibleBatch.id}
			className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center ${styles.overlay}`}
			aria-hidden="true"
		>
			<div
				className={`flex max-w-full flex-col items-center px-2 text-center ${styles.feedback}`}
			>
				{visibleBatch.outcomes.map((outcome, index) => (
					<CombatOutcomeText
						key={`${outcome.targetId}-${outcome.type}-${index}`}
						outcome={outcome}
						isIncoming={outcome.targetId === heroId}
					/>
				))}
			</div>
		</div>
	);
}

function prepareCombatFeedback(
	entries: readonly CombatLogEntry[],
	enemyId: string,
	heroId: string,
): CombatLogOutcome[] {
	const visibleEntries = entries.filter(
		({ outcome }) =>
			outcome?.type !== "healing" || (outcome.targetId === heroId && outcome.amount > 0),
	);

	return [
		...groupTargetOutcomes(visibleEntries, enemyId),
		...groupTargetOutcomes(visibleEntries, heroId),
	];
}

function groupTargetOutcomes(
	entries: readonly CombatLogEntry[],
	targetId: string,
): CombatLogOutcome[] {
	const groupedOutcomes: CombatLogOutcome[] = [];
	const damageGroupIndexes = new Map<string, number>();

	for (const entry of entries) {
		const outcome = entry.outcome;

		if (!outcome || outcome.targetId !== targetId) {
			continue;
		}

		if (outcome.type !== "damage") {
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
