import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadowmeld",
	name: "Shadowmeld",
	description:
		"Make the enemy's next attack roll an automatic miss, gain advantage on a limited number of attack rolls, and increase your critical hit damage dice multiplier.",
	icon: "skills/assassin/shadowmeld.png",
	pool: "assassin",
	kind: "technique",
	category: "buff",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "automaticFailure",
			charges: 1,
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			charges: 2,
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalDiceMultiplierBonus",
			value: 1,
			duration: { unit: "turns", value: 3 },
		},
	],
	tags: [],
});
