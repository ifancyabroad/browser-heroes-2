import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description: "Hurl a bolt of shadow energy at your target.",
	effects: [
		{
			damageType: "necrotic",
			max: 10,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 14,
			duration: 1,
			modifier: "wisdom",
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh3v9mXEeAJhlsZfwB?alt=media&token=3ac3e157-3f26-4716-b546-4ce5f00ef032",
	level: 1,
	maxUses: 12,
	name: "Shadow Bolt",
	price: 0,
	id: "shadow_bolt",
});
