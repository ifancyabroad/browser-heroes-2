import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "expose_weakness",
	name: "Expose Weakness",
	description: "Exploit armour weaknesses to maximize the impact of attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh2aa9hENKmzll2Md-?alt=media&token=811b82c0-59e5-4f46-afbd-0993015d3472",
	pool: "assassin",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			operation: "add",
			value: -8,
			durationTurns: 6,
		},
	],
	tags: [],
});
