import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "leap_attack",
	name: "Leap Attack",
	description: "Leap into the enemy with a single heavy, committed strike.",
	icon: "skills/common/leap_attack.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.75,
			attackRiders: [],
		},
	],
	tags: [],
});
