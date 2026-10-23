import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "mighty_blow",
	name: "Mighty Blow",
	description: "Make a weapon attack with increased damage.",
	icon: "skills/fighter/mighty_blow.png",
	pool: "fighter",
	kind: "weaponAttack",
	category: "damage",
	rarity: "legendary",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 3,
			attackRiders: [],
		},
	],
	tags: [],
});
