import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "detect_blood",
	name: "Detect Blood",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3XVsmOpd2YZFCQP6r?alt=media&token=a941ad22-8422-4826-8eb5-e93c15fc8bfb",
	pool: "common",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 1,
	},
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
					type: "applyStatus",
					target: "self",
					statusId: "frenzy",
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "haste",
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
					type: "applyStatus",
					target: "self",
					statusId: "frenzy",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "haste",
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
					type: "applyStatus",
					target: "self",
					statusId: "frenzy",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "haste",
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
