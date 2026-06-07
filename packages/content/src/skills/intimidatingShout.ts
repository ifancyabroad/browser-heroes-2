import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "intimidating_shout",
	name: "Intimidating Shout",
	description:
		"Release a fearsome bellow that shakes enemies, reducing their physical damage output.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-ODDidCmcQZoicnvq99Q?alt=media&token=3cc7e953-5373-4cb2-9f48-9d71cba0c175",
	pool: "barbarian",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 4,
		save: {
			attribute: "wisdom",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "wisdom",
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
					type: "modifyDamage",
					target: "enemy",
					damageType: "slashing",
					operation: "add",
					value: -50,
					durationTurns: 4,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "crushing",
					operation: "add",
					value: -50,
					durationTurns: 4,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "piercing",
					operation: "add",
					value: -50,
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "slashing",
					operation: "add",
					value: -75,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "crushing",
					operation: "add",
					value: -75,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "piercing",
					operation: "add",
					value: -75,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "slashing",
					operation: "add",
					value: -100,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "crushing",
					operation: "add",
					value: -100,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "piercing",
					operation: "add",
					value: -100,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
