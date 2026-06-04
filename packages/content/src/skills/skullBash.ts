import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 18,
			duration: 5,
			modifier: "constitution",
			properties: [
				{
					name: "crushing",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			damageType: "crushing",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCUDaUsTx_tLKhlQzc6?alt=media&token=65159a77-f38c-4e64-be8f-589968f22505",
	level: 2,
	maxUses: 5,
	name: "Skull Bash",
	price: 0,
	id: "skull_bash",
});
