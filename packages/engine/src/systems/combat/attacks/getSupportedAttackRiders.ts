import type { AttackRider, RiderEffect } from "@app/content";

export type SupportedRiderEffect = Extract<
	RiderEffect,
	{
		type:
			| "damage"
			| "heal"
			| "applyStatus"
			| "damageOverTime"
			| "healOverTime"
			| "shield"
			| "modifyStat"
			| "modifyDamage"
			| "modifyDamageTaken";
	}
>;

export type SupportedAttackRider = Omit<AttackRider, "effects"> & {
	effects: SupportedRiderEffect[];
};

export function getSupportedAttackRiders(riders: AttackRider[]): SupportedAttackRider[] | null {
	const supportedRiders: SupportedAttackRider[] = [];

	for (const rider of riders) {
		if (!rider.effects.every(isSupportedRiderEffect)) {
			return null;
		}

		supportedRiders.push({
			...rider,
			effects: rider.effects,
		});
	}

	return supportedRiders;
}

function isSupportedRiderEffect(effect: RiderEffect): effect is SupportedRiderEffect {
	switch (effect.type) {
		case "damage":
		case "heal":
		case "applyStatus":
		case "damageOverTime":
		case "healOverTime":
		case "shield":
		case "modifyStat":
		case "modifyDamage":
		case "modifyDamageTaken":
			return true;

		default:
			return false;
	}
}
