import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "fire",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 3,
			modifier: "constitution",
			properties: [
				{
					name: "dexterity",
					type: "stat",
					value: -4,
				},
				{
					name: "fire",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGREObRlRFCR7M2Ni4?alt=media&token=a9d9314a-5813-4428-ac32-a6e8724f9222",
	level: 3,
	maxUses: 7,
	name: "Engulf",
	price: 0,
	id: "engulf",
});
