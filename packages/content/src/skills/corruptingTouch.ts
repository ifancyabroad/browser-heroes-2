import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 12,
			duration: 2,
			modifier: "wisdom",
			properties: [
				{
					name: "necrotic",
					type: "resistance",
					value: -20,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkZtl6i7THVGIaWaQR?alt=media&token=196c494d-dcca-4687-9f79-92d97c171f04",
	level: 3,
	maxUses: 6,
	name: "Corrupting Touch",
	price: 0,
	id: "corrupting_touch",
});
