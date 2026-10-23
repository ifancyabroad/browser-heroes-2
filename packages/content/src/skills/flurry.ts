import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flurry",
	name: "Flurry",
	description: "Make four weapon attacks with reduced damage.",
	icon: "skills/thief/flurry.png",
	pool: "thief",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			attackRiders: [],
		},
	],
	tags: [],
});
