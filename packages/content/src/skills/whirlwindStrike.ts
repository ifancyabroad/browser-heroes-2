import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "whirlwind_strike",
	name: "Whirlwind Strike",
	description: "Make three weapon attacks against the enemy.",
	icon: "skills/barbarian/whirlwind_strike.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	rarity: "legendary",
	maxUses: 2,
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
