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
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "slashing",
					durationTurns: 6,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "crushing",
					durationTurns: 6,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "piercing",
					durationTurns: 6,
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
					damageType: "slashing",
					durationTurns: 7,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "crushing",
					durationTurns: 7,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "piercing",
					durationTurns: 7,
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
					damageType: "slashing",
					durationTurns: 8,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "crushing",
					durationTurns: 8,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "piercing",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
