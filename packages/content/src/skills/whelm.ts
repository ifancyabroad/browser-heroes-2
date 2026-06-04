import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "crushing",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 16,
			duration: 2,
			effect: "stun",
			modifier: "strength",
			target: "enemy",
			type: "auxiliary",
		},
		{
			damageType: "cold",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkdJeDGDat6H-Mf7WV?alt=media&token=93885d69-aadb-48d2-a9ab-0ffd677cc36b",
	level: 4,
	maxUses: 1,
	name: "Whelm",
	price: 0,
	id: "whelm",
});
