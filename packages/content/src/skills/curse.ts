import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "curse",
	name: "Curse",
	description:
		"Inflict a debilitating curse that forces the enemy to fail all saving throws, leaving them vulnerable.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkGRRiaTZa0Q2JeWOd?alt=media&token=3cc333c5-9195-4969-9a08-eb4ab974bc34",
	pool: "occultist",
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
					durationTurns: 6,
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
					durationTurns: 7,
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
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
