import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blind",
	name: "Blind",
	description:
		"Temporarily obscure your enemy’s vision, with a chance to cause their attacks to miss.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI69Ynmtt7mlCy4Zmvt?alt=media&token=2a821a50-422e-4e9a-b94d-1c4d5ca41f7d",
	pool: "warlock",
	category: "debuff",
	maxUses: 8,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
