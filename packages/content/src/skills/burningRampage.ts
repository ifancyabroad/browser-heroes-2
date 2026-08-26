import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "burning_rampage",
	name: "Burning Rampage",
	description: "Rampage through your foe with three blazing weapon strikes in quick succession.",
	icon: "skills/barbarian/burning_rampage.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			damageTypeOverride: "fire",
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			damageTypeOverride: "fire",
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			damageTypeOverride: "fire",
			attackRiders: [],
		},
	],
	tags: [],
});
