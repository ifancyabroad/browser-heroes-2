import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deadly_throw",
	name: "Deadly Throw",
	description:
		"Hurl a precise projectile that strikes three times, dealing consecutive piercing damage.",
	icon: "skills/assassin/deadly_throw.png",
	pool: "assassin",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d12",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d12",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d12",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
