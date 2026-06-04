import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			multiplier: 2,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			difficulty: 19,
			duration: 5,
			effect: "bleed",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eoWCYJQSO0rbXfU9J?alt=media&token=8876c24f-0392-49c5-93eb-d0f618fe1476",
	level: 3,
	maxUses: 1,
	name: "Execute",
	price: 0,
	id: "execute",
});
