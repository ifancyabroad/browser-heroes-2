import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description:
		"Unleash a vile energy that has a chance to cripple the enemy and lower their resistance to necrotic damage.",
	effects: [
		{
			difficulty: 16,
			duration: 5,
			modifier: "intelligence",
			properties: [
				{
					name: "necrotic",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			difficulty: 16,
			duration: 5,
			effect: "cripple",
			modifier: "intelligence",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI64f_s2x2W6j2Qsv1t?alt=media&token=cf6bc665-0adb-4186-8e75-fe2a87447c91",
	level: 3,
	maxUses: 4,
	name: "Corruption",
	price: 0,
	id: "corruption",
});
