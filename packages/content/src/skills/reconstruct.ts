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
					type: "modifyDamage",
					target: "self",
					damageType: "slashing",
					operation: "add",
					value: -25,
					durationTurns: 3,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -25,
					durationTurns: 3,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -25,
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
					type: "modifyDamage",
					target: "self",
					damageType: "slashing",
					operation: "add",
					value: -37,
					durationTurns: 4,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -37,
					durationTurns: 4,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -37,
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
					type: "modifyDamage",
					target: "self",
					damageType: "slashing",
					operation: "add",
					value: -50,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -50,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -50,
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
