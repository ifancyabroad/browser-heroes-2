import type { AttackRider } from "@app/content";
import { Badge } from "../Badge";
import {
	formatRiderEffect,
	formatSavingThrow,
	formatSavingThrowModifier,
} from "../../presentation/effects";

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
			<Badge label={trigger} className="text-primary" /> <span>{effectText}</span>
		</li>
	);
}

function formatSavedRiderEffects(rider: AttackRider, effects: string) {
	if (!rider.save) {
		return effects;
	}

	if (rider.save.onSuccess === "noEffect") {
		return `Failed ${formatSavingThrow(rider.save)}: ${lowercaseFirst(effects)} ${formatSavingThrowModifier(rider.save)}`;
	}

	return `${effects} ${formatSavingThrow(rider.save)}: half damage. ${formatSavingThrowModifier(rider.save)}`;
}

function lowercaseFirst(value: string) {
	return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}
