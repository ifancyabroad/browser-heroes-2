import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reconstruct",
	name: "Reconstruct",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eRbMQ_TW85fhd_iC_?alt=media&token=37961e33-b999-4f09-82e2-f6fa760630a8",
	pool: "unique",
	category: "heal",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "1d12+8",
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "slashing",
					durationTurns: 3,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "crushing",
					durationTurns: 3,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "piercing",
					durationTurns: 3,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "2d12+7",
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "slashing",
					durationTurns: 4,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "crushing",
					durationTurns: 4,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "piercing",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "2d12+14",
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "slashing",
					durationTurns: 5,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "crushing",
					durationTurns: 5,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "piercing",
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
