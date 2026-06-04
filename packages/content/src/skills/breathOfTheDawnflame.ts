import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "fire",
			max: 50,
			min: 20,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "radiant",
			max: 50,
			min: 20,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCKA2eOBOjwhJeBr4Ou?alt=media&token=1ab19e49-6f25-4374-82a7-4d650e715788",
	level: 4,
	maxUses: 5,
	name: "Breath of the Dawnflame",
	price: 0,
	id: "breath_of_the_dawnflame",
});
