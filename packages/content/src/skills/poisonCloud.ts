import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_cloud",
	name: "Poison Cloud",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJmYRSklNylLGbF7-N?alt=media&token=65d2ecf0-8545-44fd-8796-f1d728430e2b",
	pool: "common",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 4,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "dexterity",
				includeProficiency: true,
				bonus: 3,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d12+8",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "3d12+11",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "4d12+14",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
