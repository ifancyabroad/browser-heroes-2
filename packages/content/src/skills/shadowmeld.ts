import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadowmeld",
	name: "Shadowmeld",
	description: "Vanish into the shadows, frustrating incoming attacks and preparing an ambush.",
	icon: "skills/assassin/shadowmeld.png",
	pool: "assassin",
	kind: "technique",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 1,
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			durationTurns: 2,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 2,
			durationTurns: 2,
		},
	],
	tags: [],
});
