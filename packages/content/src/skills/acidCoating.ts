import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_coating",
	name: "Acid Coating",
	description: "Coat your weapon in corrosive acid to increase acid type damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZq_nhusxIdvv9LFwJZ?alt=media&token=aa5812ba-62fc-4ec5-a1cc-de61023e265c",
	pool: "rogue",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 6,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "acid",
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
					damageType: "acid",
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
					damageType: "acid",
					operation: "add",
					value: 160,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
