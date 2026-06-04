import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "poison",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 6,
			effect: "poison",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJmYRSklNylLGbF7-N?alt=media&token=65d2ecf0-8545-44fd-8796-f1d728430e2b",
	level: 4,
	maxUses: 4,
	name: "Poison Cloud",
	price: 0,
	id: "poison_cloud",
});
