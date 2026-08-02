import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frenzy",
	name: "Frenzy",
	description:
		"Enter a reckless frenzy that increases accuracy and damage at the cost of defence.",
	icon: "skills/common/frenzy.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 1.25,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -2,
			durationTurns: 4,
		},
	],
	tags: [],
});
