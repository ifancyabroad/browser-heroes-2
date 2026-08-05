import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "taunt",
	name: "Taunt",
	description:
		"Provoke the enemy into attacking recklessly, making their attacks more accurate but leaving them dangerously exposed.",
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
