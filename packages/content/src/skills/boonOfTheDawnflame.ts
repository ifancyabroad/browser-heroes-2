import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "boon_of_the_dawnflame",
	name: "Boon of the Dawnflame",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCKBZQcW3cNIj2iVasE?alt=media&token=fe75ce58-2614-435f-915d-12a869debee7",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "radiant",
					operation: "add",
					value: 50,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: 50,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "radiant",
					operation: "add",
					value: 75,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: 75,
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "radiant",
					operation: "add",
					value: 100,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: 100,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
