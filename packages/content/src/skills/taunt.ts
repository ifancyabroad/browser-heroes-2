import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "taunt",
	name: "Taunt",
	description:
		"Provoke enemies into reckless attacks, lowering your armor class but greatly boosting your critical strike chance.",
	icon: "skills/barbarian/taunt.png",
	pool: "barbarian",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -4,
			durationTurns: 2,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 5,
			durationTurns: 2,
		},
	],
	tags: [],
});
