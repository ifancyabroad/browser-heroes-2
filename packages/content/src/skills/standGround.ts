import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "Stand your ground to greatly increase defenses but reduce mobility.",
	effects: [
		{
			accuracy: 100,
			duration: 8,
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: 25,
				},
				{
					name: "crushing",
					type: "resistance",
					value: 25,
				},
				{
					name: "piercing",
					type: "resistance",
					value: 25,
				},
				{
					name: "dexterity",
					type: "stat",
					value: -2,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NJPxBkEam2oJZtHIBgY?alt=media&token=b7cdb6a8-bff3-4b1a-bac6-5ef4d8717f27",
	level: 1,
	maxUses: 6,
	name: "Stand Ground",
	price: 70,
	target: "enemy",
	id: "stand_ground",
});
