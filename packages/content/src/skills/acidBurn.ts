import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_burn",
	name: "Acid Burn",
	description: "Fling acid at the enemy to corrode their defense.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqaJ9QZYIpe6P1iDYy?alt=media&token=a61f4af5-9abf-4e8c-b41c-2cabd76120a1",
	pool: "rogue",
	category: "spell",
	maxUses: 6,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "1d12",
					requiresAttackRoll: false,
					save: {
						attribute: "dexterity",
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
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -5,
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
					damageType: "acid",
					dice: "2d12-4",
					requiresAttackRoll: false,
					save: {
						attribute: "dexterity",
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
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -7,
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
					damageType: "acid",
					dice: "2d12-1",
					requiresAttackRoll: false,
					save: {
						attribute: "dexterity",
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
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -10,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
