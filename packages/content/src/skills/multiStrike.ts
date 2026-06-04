import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJ653IrMrMC4NtDiZ0?alt=media&token=c1252dde-ce75-4ee0-bfaa-b5c108be2294",
	level: 4,
	maxUses: 3,
	name: "Multi Strike",
	price: 0,
	id: "multi_strike",
});
