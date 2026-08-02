import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "taunt",
	name: "Taunt",
	description:
		"Provoke the enemy into attacking more aggressively while creating openings for critical strikes.",
	icon: "skills/barbarian/taunt.png",
	pool: "barbarian",
	kind: "technique",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "advantage",
			durationTurns: 2,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 4,
			durationTurns: 2,
		},
	],
	tags: [],
});
