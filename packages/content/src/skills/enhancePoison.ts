import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "enhance_poison",
	name: "Enhance Poison",
	description: "Concentrate your toxins, then immediately strike with a weapon steeped in venom.",
	icon: "skills/assassin/enhance_poison.png",
	pool: "assassin",
	kind: "technique",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "poison",
			operation: "multiply",
			value: 1.5,
			durationTurns: 3,
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			damageTypeOverride: "poison",
			attackRiders: [],
		},
	],
	tags: [],
});
