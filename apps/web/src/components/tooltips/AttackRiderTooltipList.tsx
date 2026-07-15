import type { AttackRider } from "@app/content";
import { Badge } from "../Badge";
import { formatRiderEffect, formatSavingThrow } from "../../game/effectDisplay";

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
	const effectText = rider.effects.map(formatRiderEffect).join("; ");
	const saveText = rider.save ? `${formatSavingThrow(rider.save)}; ` : "";

	return (
		<li key={`${rider.timing}-${index}`} className="break-words">
			<span className="text-text-muted">- </span>
			<Badge label={trigger} className="text-primary" />{" "}
			<span>
				{saveText}
				{effectText}
			</span>
		</li>
	);
}
