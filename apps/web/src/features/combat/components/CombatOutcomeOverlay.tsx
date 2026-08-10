import { useEffect, useRef, useState } from "react";
import type { CombatLogEntry, CombatLogOutcome } from "@app/engine";
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

		const enemyOutcomes = newEntries.flatMap((entry) =>
			entry.outcome?.targetId === enemyId ? [entry.outcome] : [],
		);

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
			<div className="flex flex-col items-center gap-1 text-center font-bold drop-shadow-[2px_2px_0_var(--color-bg-base)]">
				{visibleBatch.outcomes.map((outcome, index) => (
					<CombatOutcomeText key={`${outcome.type}-${index}`} outcome={outcome} />
				))}
			</div>
		</div>
	);
}

function CombatOutcomeText({ outcome }: { outcome: CombatLogOutcome }) {
	if (outcome.type === "miss") {
		return <p className="text-info">MISS</p>;
	}

	const damageType = outcome.damageType.toUpperCase();
	const sizeStep = Math.max(0, Math.floor(Math.log2(Math.max(1, outcome.hpDamage) / 10)));
	const style = { fontSize: `${1 + sizeStep * 0.125}rem` };

	if (outcome.affinity === "immune") {
		return (
			<p className="text-info" style={{ fontSize: "1rem" }}>
				IMMUNE: {damageType}
			</p>
		);
	}

	return (
		<p className={outcome.critical ? "text-legendary" : "text-error"} style={style}>
			{outcome.critical && "CRIT "}
			{outcome.hpDamage > 0 ? `-${outcome.hpDamage}` : "0"} {damageType}
			{outcome.absorbedDamage > 0 && (
				<span className="text-text-muted"> ({outcome.absorbedDamage} BLOCKED)</span>
			)}
		</p>
	);
}
