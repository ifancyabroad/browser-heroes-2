import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "elemental_shield",
	name: "Elemental Shield",
	description:
		"Summon a protective barrier infused with elemental energy to guard against attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCz3gjt9HaaTCJh2XIS?alt=media&token=32b231dd-9a2e-4b5d-997c-4647a8fcb717",
	pool: "warrior",
	category: "buff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: -25,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: -25,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: -25,
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
					damageType: "fire",
					operation: "add",
					value: -37,
					durationTurns: 9,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: -37,
					durationTurns: 9,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: -37,
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
					damageType: "fire",
					operation: "add",
					value: -50,
					durationTurns: 10,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: -50,
					durationTurns: 10,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: -50,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
