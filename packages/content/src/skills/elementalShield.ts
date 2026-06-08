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
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "fire",
					durationTurns: 8,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "cold",
					durationTurns: 8,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "lightning",
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "fire",
					durationTurns: 9,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "cold",
					durationTurns: 9,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "lightning",
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "fire",
					durationTurns: 10,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "cold",
					durationTurns: 10,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "lightning",
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
