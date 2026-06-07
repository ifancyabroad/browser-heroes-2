import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_strike",
	name: "Poison Strike",
	description: "Coat your weapon with venom, delivering a toxic blow that poisons your target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhgyxj9aTH40MK_MCPF?alt=media&token=ed4f5378-03ef-4011-9a54-01da6bb758f3",
	pool: "assassin",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 7,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 6,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "1d8",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.25,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 7,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d8-2",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 8,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d8",
				},
			],
		},
	],
	tags: [],
});
