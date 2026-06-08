import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sunburst",
	name: "Sunburst",
	description:
		"Unleash a blinding burst of radiant energy, dealing significant damage with a chance to blind your enemies.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkT3OrPY0IOvzISeE0?alt=media&token=6642aefd-0e9d-4f0e-8b7e-d647a3873692",
	pool: "cleric",
	category: "spell",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "2d12+8",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "3d12+11",
					attribute: "wisdom",
					requiresAttackRoll: false,
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
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "4d12+14",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
