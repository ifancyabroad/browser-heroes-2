import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "fire",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "radiant",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJykYbURtCWS-6Ljqx?alt=media&token=17d79da7-a922-46b4-9549-08430f08e57e",
	level: 4,
	maxUses: 2,
	name: "Overcharge",
	price: 0,
	id: "overcharge",
});
