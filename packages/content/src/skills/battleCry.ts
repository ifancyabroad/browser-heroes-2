import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "battle_cry",
	name: "Battle Cry",
	description: "Increase your maximum HP and physical damage dealt for the current battle.",
	icon: "skills/barbarian/battle_cry.png",
	pool: "barbarian",
	kind: "technique",
	category: "buff",
	rarity: "common",
	maxUses: 5,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 20,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "self",
			damageClass: "physical",
			operation: "multiply",
			value: 1.25,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
