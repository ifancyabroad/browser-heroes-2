import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tentacle_crush",
	name: "Tentacle Crush",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJ9MXut2odMwmv0r95?alt=media&token=560f5896-0d54-4197-a3af-8db72115b0f9",
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
					damageType: "crushing",
					dice: "2d12+15",
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
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -4,
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
					damageType: "crushing",
					dice: "3d12+21",
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
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -6,
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
					damageType: "crushing",
					dice: "4d12+27",
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
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -8,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
