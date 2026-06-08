import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "last_stand",
	name: "Last Stand",
	description:
		"Summon your remaining strength to recover health and temporarily bolster your physical resilience.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHm6ropyvvjWSACK2Gc?alt=media&token=19ebde6c-7a8f-45b6-b288-102706f7ffaf",
	pool: "warrior",
	category: "heal",
	maxUses: 1,
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
					durationTurns: 2,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "crushing",
					durationTurns: 2,
				},
				{
					type: "modifyDamageAffinity",
					target: "self",
					affinity: "resistance",
					operation: "add",
					damageType: "piercing",
					durationTurns: 2,
				},
				{
					type: "heal",
					target: "self",
					dice: "18d6+7",
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
				{
					type: "heal",
					target: "self",
					dice: "27d6+7",
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
				{
					type: "heal",
					target: "self",
					dice: "36d6+7",
				},
			],
		},
	],
	tags: [],
});
