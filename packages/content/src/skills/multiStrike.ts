import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "multi_strike",
	name: "Multi Strike",
	description: "Unleash three successive attacks before the enemy can recover.",
	icon: "skills/common/multi_strike.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.75,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.75,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.75,
			attackRiders: [],
		},
	],
	tags: [],
});
