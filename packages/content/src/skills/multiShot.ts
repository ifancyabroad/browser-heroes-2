import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "multi_shot",
	name: "Multi Shot",
	description: "Loose three rapid projectiles, each dealing reduced weapon damage.",
	icon: "skills/common/multi_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
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
