import type { AttackRider } from "@app/content";
import { Badge } from "../Badge";
import { formatRiderEffect, formatSavingThrow } from "../../presentation/effects";

type AttackRiderTooltipListProps = {
	riders: readonly AttackRider[];
};

export function AttackRiderTooltipList({ riders }: AttackRiderTooltipListProps) {
	return (
		<ul className="grid gap-1">
			{riders.map((rider, riderIndex) => (
				<AttackRiderTooltipItem
					key={`${rider.timing}-${riderIndex}`}
					rider={rider}
					index={riderIndex}
				/>
			))}
		</ul>
	);
}

function AttackRiderTooltipItem({ rider, index }: { rider: AttackRider; index: number }) {
	const trigger = rider.timing === "onHit" ? "On hit" : "On crit";
	const effects = rider.effects.map(formatRiderEffect).join(" ");
	const effectText = formatSavedRiderEffects(rider, effects);

	return (
		<li key={`${rider.timing}-${index}`} className="break-words">
			<span className="text-text-muted">- </span>
			<Badge label={trigger} className="text-primary" /> <span>{effectText}</span>
		</li>
	);
}

function formatSavedRiderEffects(rider: AttackRider, effects: string) {
	if (!rider.save) {
		return effects;
	}

	if (rider.save.onSuccess === "noEffect") {
		return `${formatSavingThrow(rider.save)}. On Failure: ${effects}`;
	}

	return `${formatSavingThrow(rider.save)}. On Success: Half damage. ${effects}`;
}
