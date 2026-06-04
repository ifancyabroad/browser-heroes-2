import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "fire",
			max: 50,
			min: 20,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9ePhvfJJr-bhi0Iial?alt=media&token=e696471d-3bbd-45a5-a596-e9c20de5956f",
	level: 4,
	maxUses: 2,
	name: "Fire Breath",
	price: 0,
	id: "fire_breath",
});
