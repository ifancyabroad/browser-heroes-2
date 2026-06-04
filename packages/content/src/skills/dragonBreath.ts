import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description: "Unleash a cone of fiery devastation, scorching everything in its path.",
	effects: [
		{
			damageType: "fire",
			max: 30,
			min: 12,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 22,
			duration: 4,
			modifier: "constitution",
			properties: [
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc41TbX58HmCh6nednT?alt=media&token=a93e95c5-514e-4268-b3b2-db3268545b35",
	level: 4,
	maxUses: 3,
	name: "Dragon Breath",
	price: 1550,
	id: "dragon_breath",
});
