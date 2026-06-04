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
			duration: 4,
			modifier: "strength",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJ9MXut2odMwmv0r95?alt=media&token=560f5896-0d54-4197-a3af-8db72115b0f9",
	level: 4,
	maxUses: 4,
	name: "Tentacle Crush",
	price: 0,
	id: "tentacle_crush",
});
