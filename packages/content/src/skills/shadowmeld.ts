import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadowmeld",
	name: "Shadowmeld",
	description: "Blend into the shadows to enhance your armor class and sharpen your accuracy.",
	icon: "skills/assassin/shadowmeld.png",
	pool: "assassin",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 3,
			durationTurns: 8,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 8,
		},
	],
	tags: [],
});
