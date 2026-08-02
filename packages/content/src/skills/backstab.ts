import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "backstab",
	name: "Backstab",
	description: "Sneak behind the enemy to strike them in the back.",
	icon: "skills/assassin/backstab.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 1,
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
