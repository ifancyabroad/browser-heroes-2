import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overpower",
	name: "Overpower",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC0BnBNFGwHwz1CugLe?alt=media&token=814a1aa1-3f7b-4bcc-bd73-eec753a24932",
	pool: "common",
	category: "spell",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -4,
					durationTurns: 3,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "1d12+8",
					requiresAttackRoll: false,
					save: {
						attribute: "strength",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "strength",
							includeProficiency: true,
							bonus: 3,
						},
					},
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -6,
					durationTurns: 4,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+7",
					requiresAttackRoll: false,
					save: {
						attribute: "strength",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "strength",
							includeProficiency: true,
							bonus: 3,
						},
					},
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -8,
					durationTurns: 5,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+14",
					requiresAttackRoll: false,
					save: {
						attribute: "strength",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "strength",
							includeProficiency: true,
							bonus: 3,
						},
					},
				},
			],
		},
	],
	tags: [],
});
