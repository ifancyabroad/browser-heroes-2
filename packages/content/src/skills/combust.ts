import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "Overheat and erupt into flames burning all those around you.",
	effects: [
		{
			damageType: "fire",
			max: 100,
			min: 100,
			target: "self",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 60,
			min: 30,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O4VXesSYLdWh1Qf_7Io?alt=media&token=ec76c559-adce-4e10-8940-360fb1a03497",
	level: 3,
	maxUses: 1,
	name: "Combust",
	price: 0,
	id: "combust",
});
