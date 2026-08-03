import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "backstab",
	name: "Backstab",
	description: "Exploit the enemy's blind spot with a devastating, precise strike.",
	icon: "skills/assassin/backstab.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 3,
			rollMode: "advantage",
			attackRiders: [],
		},
	],
	tags: [],
});
