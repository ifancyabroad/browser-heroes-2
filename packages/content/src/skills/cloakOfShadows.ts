import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cloak_of_shadows",
	name: "Cloak Of Shadows",
	description: "Shroud yourself in dark energy, enhancing resistance to elemental attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdUiFhyxCULAsWYJl?alt=media&token=ab345aab-5ea3-49ef-81e8-ed3481946db6",
	pool: "assassin",
	category: "buff",
	maxUses: 3,
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
					durationTurns: 5,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "cold",
					durationTurns: 5,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "lightning",
					durationTurns: 5,
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
					durationTurns: 6,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "cold",
					durationTurns: 6,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "lightning",
					durationTurns: 6,
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
					durationTurns: 7,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "cold",
					durationTurns: 7,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "lightning",
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
