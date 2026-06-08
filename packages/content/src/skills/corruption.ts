import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corruption",
	name: "Corruption",
	description:
		"Unleash a vile energy that has a chance to cripple the enemy and lower their resistance to necrotic damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI64f_s2x2W6j2Qsv1t?alt=media&token=cf6bc665-0adb-4186-8e75-fe2a87447c91",
	pool: "warlock",
	category: "debuff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "necrotic",
					operation: "add",
					value: 25,
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 5,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "necrotic",
					operation: "add",
					value: 38,
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 6,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "necrotic",
					operation: "add",
					value: 50,
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
