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
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: -25,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: -25,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: -25,
					durationTurns: 5,
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
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: -37,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: -37,
					durationTurns: 6,
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
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: -50,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: -50,
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
