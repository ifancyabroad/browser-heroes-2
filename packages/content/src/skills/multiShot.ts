import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "multi_shot",
	name: "Multi Shot",
	icon: "skills/common/multi_shot.png",
	pool: "common",
	category: "attack",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
	],
	tags: [],
});
