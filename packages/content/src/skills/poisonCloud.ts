import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_cloud",
	name: "Poison Cloud",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJmYRSklNylLGbF7-N?alt=media&token=65d2ecf0-8545-44fd-8796-f1d728430e2b",
	pool: "common",
	category: "spell",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d12+8",
					requiresAttackRoll: false,
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
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "1d8",
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
					requiresAttackRoll: false,
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
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "1d10",
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
					requiresAttackRoll: false,
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
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "1d12",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
