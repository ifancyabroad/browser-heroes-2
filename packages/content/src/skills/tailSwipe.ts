import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tail_swipe",
	name: "Tail Swipe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTlKRQQ38mTQ-94KcL?alt=media&token=d8d65416-95b7-49f8-af11-e087261f419b",
	pool: "common",
	category: "spell",
	maxUses: 7,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+8",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "dexterity",
							includeProficiency: true,
							bonus: 0,
						},
					},
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 1,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "3d12+11",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "dexterity",
							includeProficiency: true,
							bonus: 0,
						},
					},
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 2,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "4d12+14",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "dexterity",
							includeProficiency: true,
							bonus: 0,
						},
					},
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 3,
				},
			],
		},
	],
	tags: [],
});
