import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unwavering_lies",
	name: "Unwavering Lies",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC8_KrCSlLCSAitJUg6?alt=media&token=df0b551d-d289-423a-a18a-b0e85db738fc",
	pool: "unique",
	category: "debuff",
	maxUses: 2,
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
					durationTurns: 3,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -5,
					durationTurns: 3,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "wisdom",
					operation: "add",
					value: -5,
					durationTurns: 3,
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
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -7,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "wisdom",
					operation: "add",
					value: -7,
					durationTurns: 4,
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
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -10,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "wisdom",
					operation: "add",
					value: -10,
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
