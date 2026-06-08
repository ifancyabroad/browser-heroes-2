import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "detect_blood",
	name: "Detect Blood",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3XVsmOpd2YZFCQP6r?alt=media&token=a941ad22-8422-4826-8eb5-e93c15fc8bfb",
	pool: "common",
	category: "buff",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: 20,
					durationTurns: 3,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 2,
					durationTurns: 3,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 2,
					durationTurns: 3,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: 30,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 3,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 3,
					durationTurns: 4,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: 40,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 4,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 4,
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
