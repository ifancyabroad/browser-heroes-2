import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deadly_throw",
	name: "Deadly Throw",
	description: "Hurl three blades in rapid succession, each requiring a precise hit.",
	icon: "skills/assassin/deadly_throw.png",
	pool: "assassin",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d8",
			attribute: "dexterity",
			requiresAttackRoll: true,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d8",
			attribute: "dexterity",
			requiresAttackRoll: true,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d8",
			attribute: "dexterity",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
