import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "engulf",
	name: "Engulf",
	description:
		"Surround the enemy in living flame that burns immediately and continues to consume them.",
	icon: "skills/unique/engulf.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "4d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			dice: "2d6",
			durationTurns: 3,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
