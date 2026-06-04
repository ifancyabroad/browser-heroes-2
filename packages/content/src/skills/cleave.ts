import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description: "A powerful weapon swing that deals additional slashing damage.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "slashing",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NJLRtY1B4JdDuOGq2sd?alt=media&token=23f9149d-b849-48df-a3b7-bbbfe6bdc20a",
	level: 1,
	maxUses: 7,
	name: "Cleave",
	price: 20,
	target: "enemy",
	id: "cleave",
});
