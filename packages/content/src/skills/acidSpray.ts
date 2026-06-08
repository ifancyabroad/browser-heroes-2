import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_spray",
	name: "Acid Spray",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTn5gefrbm_w1g4ocL?alt=media&token=d2280b22-36b1-4e96-a969-c667322ebc91",
	pool: "common",
	category: "spell",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "1d10+5",
					requiresAttackRoll: false,
					save: {
						attribute: "dexterity",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "dexterity",
							includeProficiency: true,
							bonus: 1,
						},
					},
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -4,
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
					damageType: "acid",
					dice: "2d10+4",
					requiresAttackRoll: false,
					save: {
						attribute: "dexterity",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "dexterity",
							includeProficiency: true,
							bonus: 1,
						},
					},
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -6,
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
					damageType: "acid",
					dice: "2d10+9",
					requiresAttackRoll: false,
					save: {
						attribute: "dexterity",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "dexterity",
							includeProficiency: true,
							bonus: 1,
						},
					},
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -8,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
