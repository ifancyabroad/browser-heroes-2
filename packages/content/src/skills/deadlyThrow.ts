import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description:
		"Hurl a precise projectile that strikes three times, dealing consecutive piercing damage.",
	effects: [
		{
			damageType: "piercing",
			max: 12,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "piercing",
			max: 12,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "piercing",
			max: 12,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1_TG1astp9RlqRUu2?alt=media&token=b926b393-510a-4ead-bcca-4125fa8b99bb",
	level: 3,
	maxUses: 4,
	name: "Deadly Throw",
	price: 0,
	id: "deadly_throw",
});
