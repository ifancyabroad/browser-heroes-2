import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "crushing",
			max: 40,
			min: 16,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 3,
			modifier: "constitution",
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: -50,
				},
				{
					name: "crushing",
					type: "resistance",
					value: -50,
				},
				{
					name: "piercing",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4ec48-KD77fXEGDx8?alt=media&token=10218c46-11e1-4597-ae2d-545151ea8879",
	level: 4,
	maxUses: 2,
	name: "Obliterate",
	price: 0,
	id: "obliterate",
});
