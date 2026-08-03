import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flamestrike",
	name: "Flamestrike",
	description: "Call down searing divine fire that leaves the enemy burning in its wake.",
	icon: "skills/cleric/flamestrike.png",
	pool: "cleric",
	kind: "prayer",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "2d6",
			attribute: "wisdom",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d6",
			attribute: "wisdom",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			dice: "1d6",
			durationTurns: 3,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
