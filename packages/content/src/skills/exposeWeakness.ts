import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "expose_weakness",
	name: "Expose Weakness",
	description: "Exploit armour weaknesses to maximize the impact of attacks.",
	icon: "skills/assassin/expose_weakness.png",
	pool: "assassin",
	kind: "technique",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -8,
			durationTurns: 6,
		},
	],
	tags: [],
});
