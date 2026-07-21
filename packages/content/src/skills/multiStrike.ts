import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "multi_strike",
	name: "Multi Strike",
	icon: "skills/common/multi_strike.png",
	pool: "common",
	category: "attack",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
	],
	tags: [],
});
