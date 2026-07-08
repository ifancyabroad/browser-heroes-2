import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deadly_throw",
	name: "Deadly Throw",
	description:
		"Hurl a precise projectile that strikes three times, dealing consecutive piercing damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1_TG1astp9RlqRUu2?alt=media&token=b926b393-510a-4ead-bcca-4125fa8b99bb",
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
