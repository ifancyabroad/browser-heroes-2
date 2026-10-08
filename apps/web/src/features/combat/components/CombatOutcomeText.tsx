import type { CombatLogOutcome } from "@app/engine";
import { getDamageTypeTextClass } from "../../../presentation/damage";

export function CombatOutcomeText({
	outcome,
	isIncoming,
}: {
	outcome: CombatLogOutcome;
	isIncoming: boolean;
}) {
	if (outcome.type === "miss") {
		return (
			<p
				className={`${isIncoming ? "text-text-bright" : "text-error"} text-2xl leading-tight`}
			>
				{isIncoming ? "EVADED" : "MISSED"}
			</p>
		);
	}

	const amount = outcome.type === "healing" ? outcome.amount : outcome.hpDamage;
	const sizeStep = Math.max(0, Math.floor(Math.log2(Math.max(1, amount) / 10)) + 1);
	const style = { fontSize: `${2 + sizeStep * 0.5}rem` };

	if (outcome.type === "healing") {
		return (
			<p className="text-success tabular-nums leading-tight" style={style}>
				+{outcome.amount}
			</p>
		);
	}

	const damageType = outcome.damageType.toUpperCase();
	const damageTypeClass = getDamageTypeTextClass(outcome.damageType);

	if (outcome.affinity === "immune") {
		return <p className={`${damageTypeClass} text-2xl leading-tight`}>IMMUNE ({damageType})</p>;
	}

	return (
		<p className={`${damageTypeClass} tabular-nums leading-tight`} style={style}>
			{isIncoming && outcome.hpDamage > 0 ? `-${outcome.hpDamage}` : outcome.hpDamage}
			{outcome.critical && <span className="text-primary"> CRIT</span>}
			{outcome.absorbedDamage > 0 && (
				<span className="text-text-muted"> ({outcome.absorbedDamage} BLOCKED)</span>
			)}
		</p>
	);
}
