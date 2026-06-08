import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "embrace_shadows",
	name: "Embrace Shadows",
	description: "Imbue yourself with necrotic energy to improve spell power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh4hPWuWx_NN1YApGU?alt=media&token=deb4a7d0-86c8-4750-afea-79b9730efece",
	pool: "warlock",
	category: "buff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "necrotic",
					operation: "add",
					value: 80,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "necrotic",
					operation: "add",
					value: 120,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "necrotic",
					operation: "add",
					value: 160,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
