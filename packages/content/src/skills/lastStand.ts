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
					type: "modifyDamage",
					target: "self",
					damageType: "slashing",
					operation: "add",
					value: -25,
					durationTurns: 2,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -25,
					durationTurns: 2,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -25,
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
					type: "modifyDamage",
					target: "self",
					damageType: "slashing",
					operation: "add",
					value: -37,
					durationTurns: 3,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -37,
					durationTurns: 3,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -37,
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
					type: "modifyDamage",
					target: "self",
					damageType: "slashing",
					operation: "add",
					value: -50,
					durationTurns: 4,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: -50,
					durationTurns: 4,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "piercing",
					operation: "add",
					value: -50,
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
