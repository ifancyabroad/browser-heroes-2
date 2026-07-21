import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "powerful_blow",
	name: "Powerful Blow",
	icon: "skills/common/powerful_blow.png",
	pool: "common",
	category: "attack",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			attackRiders: [],
		},
	],
	tags: [],
});
