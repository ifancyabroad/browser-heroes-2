import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "backstab",
	name: "Backstab",
	description: "Make a weapon attack with advantage and increased damage.",
	icon: "skills/assassin/backstab.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 4,
			rollMode: "advantage",
			attackRiders: [],
		},
	],
	tags: [],
});
