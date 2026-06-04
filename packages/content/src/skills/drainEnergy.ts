import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Sap your enemy’s constitution to weaken them, while replenishing your own vitality.",
	effects: [
		{
			difficulty: 18,
			duration: 6,
			modifier: "constitution",
			properties: [
				{
					name: "constitution",
					type: "stat",
					value: -6,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			duration: 6,
			properties: [
				{
					name: "constitution",
					type: "stat",
					value: 6,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTbtbVc3qk03XQO0GP?alt=media&token=d7bd191c-11cc-486a-bec4-aba3d27306fb",
	level: 2,
	maxUses: 8,
	name: "Drain Energy",
	price: 0,
	id: "drain_energy",
});
