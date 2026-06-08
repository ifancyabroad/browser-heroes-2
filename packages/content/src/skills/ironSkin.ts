import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "iron_skin",
	name: "Iron Skin",
	description: "Harden the skin to greatly increase physical resistance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3yE_BOq5Xmhy4LvbI?alt=media&token=7098ab93-e0ec-486f-9f9b-2715b57815b6",
	pool: "warlock",
	category: "buff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "slashing",
					operation: "add",
					value: -25,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -25,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -25,
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
					damageType: "slashing",
					operation: "add",
					value: -37,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -37,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -37,
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
					damageType: "slashing",
					operation: "add",
					value: -50,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -50,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -50,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
