import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "double_strike",
	name: "Double Strike",
	description: "Execute two rapid attacks in quick succession against a single target.",
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
