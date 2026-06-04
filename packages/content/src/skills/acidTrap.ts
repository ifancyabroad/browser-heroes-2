import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Trap your enemy to incapacitate them and reduce their defenses.",
	effects: [
		{
			accuracy: 100,
			difficulty: 22,
			duration: 1,
			effect: "stun",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
		{
			difficulty: 22,
			duration: 5,
			modifier: "dexterity",
			properties: [
				{
					name: "acid",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdkxMP9wTCz81_T4e?alt=media&token=ff085bdf-6540-4975-9837-bbf5a6d3a5bc",
	level: 4,
	maxUses: 3,
	name: "Acid Trap",
	price: 1380,
	id: "acid_trap",
});
