import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "disarm",
	name: "Disarm",
	description: "Attempt to disarm the enemy.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqUxJ5hBOkYc_e-wuG?alt=media&token=0a58571b-84fa-4b18-9ae1-ef62ca3bdd2d",
	pool: "common",
	category: "debuff",
	maxUses: 3,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 3,
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
					durationTurns: 4,
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
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
