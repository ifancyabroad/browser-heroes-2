import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description: "",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "crushing",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-ODAw3gDINrvjsnEE52L?alt=media&token=583e5483-a891-4f18-a897-0bc2f4781577",
	level: 2,
	maxUses: 7,
	name: "Crushing Blow",
	price: 0,
	id: "crushing_blow",
});
