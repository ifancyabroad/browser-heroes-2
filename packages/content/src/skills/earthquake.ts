import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "earthquake",
	name: "Earthquake",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJgE_UIN33YF5ZKfZD?alt=media&token=0bfce70c-bd52-49fe-b68f-a2ca75852719",
	pool: "common",
	category: "spell",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+15",
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
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "3d12+21",
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
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "4d12+27",
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
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
