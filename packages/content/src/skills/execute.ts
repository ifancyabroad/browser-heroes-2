import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "execute",
	name: "Execute",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eoWCYJQSO0rbXfU9J?alt=media&token=8876c24f-0392-49c5-93eb-d0f618fe1476",
	pool: "unique",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 1,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 2,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 5,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 2.5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 6,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 3,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
