import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description:
		"Deliver a swift strike imbued with shadowy energy, dealing necrotic damage to your target.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "necrotic",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCUEy6k5HuRL-oXw1-y?alt=media&token=9d7cfcff-a684-443c-9009-3765ec600d9e",
	level: 2,
	maxUses: 7,
	name: "Shadow Strike",
	price: 0,
	id: "shadow_strike",
});
