import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			max: 20,
			min: 8,
			target: "self",
			type: "heal",
		},
		{
			duration: 3,
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: 40,
				},
				{
					name: "crushing",
					type: "resistance",
					value: 40,
				},
				{
					name: "piercing",
					type: "resistance",
					value: 40,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eRbMQ_TW85fhd_iC_?alt=media&token=37961e33-b999-4f09-82e2-f6fa760630a8",
	level: 3,
	maxUses: 1,
	name: "Reconstruct",
	price: 0,
	id: "reconstruct",
});
