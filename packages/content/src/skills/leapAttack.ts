import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 1.75,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3_Ea2wZ_5cHuPGwB5?alt=media&token=94f7574d-1aa9-468b-8dc3-700988e623bf",
	level: 3,
	maxUses: 4,
	name: "Leap Attack",
	price: 0,
	id: "leap_attack",
});
