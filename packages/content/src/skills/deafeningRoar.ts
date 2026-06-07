import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_roar",
	name: "Deafening Roar",
	description: "Unleash a crippling roar that weakens and disorients nearby enemies.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhgy1Vmh0FTTPCWBory?alt=media&token=9f2b03e8-b95d-403d-86e0-acd4e362468e",
	pool: "common",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 6,
		save: {
			attribute: "wisdom",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "wisdom",
				includeProficiency: true,
				bonus: 4,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "strength",
					operation: "add",
					value: -6,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "dexterity",
					operation: "add",
					value: -6,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -6,
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "strength",
					operation: "add",
					value: -9,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "dexterity",
					operation: "add",
					value: -9,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -9,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "strength",
					operation: "add",
					value: -12,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "dexterity",
					operation: "add",
					value: -12,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -12,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
