import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tenderise",
	name: "Tenderise",
	description: "Beat the enemy into submission with a chance to lower physical resistances.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqXb0gVgqwcQmz5Kty?alt=media&token=888faf17-25f3-4981-b1d4-34a7017ebade",
	pool: "barbarian",
	category: "debuff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "slashing",
					operation: "add",
					value: 25,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "crushing",
					operation: "add",
					value: 25,
					durationTurns: 5,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "piercing",
					operation: "add",
					value: 25,
					durationTurns: 5,
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
					value: 38,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "crushing",
					operation: "add",
					value: 38,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "piercing",
					operation: "add",
					value: 38,
					durationTurns: 6,
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
					value: 50,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "crushing",
					operation: "add",
					value: 50,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "piercing",
					operation: "add",
					value: 50,
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
