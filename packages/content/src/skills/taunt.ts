import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "taunt",
	name: "Taunt",
	description:
		"Give the enemy advantage on a limited number of attack rolls, but increase all damage they take.",
	icon: "skills/barbarian/taunt.png",
	pool: "barbarian",
	kind: "technique",
	category: "buff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "advantage",
			charges: 2,
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "modifyDamageTaken",
			target: "enemy",
			operation: "multiply",
			value: 2,
			duration: { unit: "turns", value: 3 },
		},
	],
	tags: [],
});
