import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadowmeld",
	name: "Shadowmeld",
	description: "Vanish into the shadows, frustrating incoming attacks and preparing an ambush.",
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
			durationTurns: 3,
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			charges: 2,
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalDiceMultiplierBonus",
			value: 1,
			durationTurns: 3,
		},
	],
	tags: [],
});
