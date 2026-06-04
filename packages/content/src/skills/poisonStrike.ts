import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Coat your weapon with venom, delivering a toxic blow that poisons your target.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			difficulty: 19,
			duration: 6,
			effect: "poison",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			damageType: "poison",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhgyxj9aTH40MK_MCPF?alt=media&token=ed4f5378-03ef-4011-9a54-01da6bb758f3",
	level: 3,
	maxUses: 7,
	name: "Poison Strike",
	price: 0,
	id: "poison_strike",
});
