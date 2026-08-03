import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "magic_missiles",
	name: "Magic Missiles",
	description: "Conjure five arcane missiles that unerringly strike the enemy.",
	icon: "skills/mage/magic_missiles.png",
	pool: "mage",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
