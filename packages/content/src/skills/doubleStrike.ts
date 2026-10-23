import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "double_strike",
	name: "Double Strike",
	description: "Make two weapon attacks against the enemy.",
	icon: "skills/fighter/double_strike.png",
	pool: "fighter",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
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
	],
	tags: [],
});
