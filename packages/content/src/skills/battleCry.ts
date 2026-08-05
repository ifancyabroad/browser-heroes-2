import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "battle_cry",
	name: "Battle Cry",
	description:
		"Release a resounding battle cry that bolsters vitality and empowers your attacks.",
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
			operation: "multiply",
			value: 1.25,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
