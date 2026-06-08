import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_trap",
	name: "Acid Trap",
	description: "Trap your enemy to incapacitate them and reduce their defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdkxMP9wTCz81_T4e?alt=media&token=ff085bdf-6540-4975-9837-bbf5a6d3a5bc",
	pool: "rogue",
	category: "debuff",
	maxUses: 3,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 1,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "acid",
					operation: "add",
					value: 25,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 2,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "acid",
					operation: "add",
					value: 38,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 3,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "acid",
					operation: "add",
					value: 50,
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
