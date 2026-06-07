import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fracture",
	name: "Fracture",
	description:
		"Deliver a precise and devastating strike that disrupts the enemy's defenses, reducing their resistance to physical attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NKt5eqAEIJYZFNbvK8f?alt=media&token=ec2639b6-7611-42a2-b954-f6bd5a35962c",
	pool: "assassin",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 3,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "constitution",
				includeProficiency: true,
				bonus: 6,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "slashing_resistance_down",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 4,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+11",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "cripple",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "slashing_resistance_down",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 5,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "3d12+15",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "cripple",
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "slashing_resistance_down",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 6,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "4d12+20",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "cripple",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
