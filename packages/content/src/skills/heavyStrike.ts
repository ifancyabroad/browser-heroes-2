import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "heavy_strike",
	name: "Heavy Strike",
	description: "Make a weapon attack with increased damage.",
	icon: "skills/fighter/heavy_strike.png",
	pool: "fighter",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
	maxUses: 6,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			attackRiders: [],
		},
	],
	tags: [],
});
