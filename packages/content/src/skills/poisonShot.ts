import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_shot",
	name: "Poison Shot",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-puizRMUbmSpZfc8i?alt=media&token=7bde7857-e17e-42fa-95cc-18460ca736ef",
	pool: "common",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 4,
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
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "1d6-1",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 3,
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
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d6-3",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 4,
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
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d6-2",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
