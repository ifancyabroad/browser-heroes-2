import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 50,
			min: 20,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCFAqXAhK7qK26RFFWx?alt=media&token=fd22e91b-e0b6-48a3-866c-72b3668c03b1",
	level: 4,
	maxUses: 2,
	name: "Necro Breath",
	price: 0,
	id: "necro_breath",
});
