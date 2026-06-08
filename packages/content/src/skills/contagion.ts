import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "contagion",
	name: "Contagion",
	description:
		"Infect the enemy with a virulent poison, significantly increasing the damage over time as it spreads through their system.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6DWEvSdPHN3sCBzuV?alt=media&token=29173920-9308-4195-a763-56e611914d4b",
	pool: "occultist",
	category: "debuff",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poisoned",
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 100,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poisoned",
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 150,
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poisoned",
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 200,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
