import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "whelm",
	name: "Whelm",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkdJeDGDat6H-Mf7WV?alt=media&token=93885d69-aadb-48d2-a9ab-0ffd677cc36b",
	pool: "unique",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 1,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "strength",
				includeProficiency: true,
				bonus: 0,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+8",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 2,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "2d12+8",
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
					dice: "3d12+11",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 3,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "3d12+11",
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
					dice: "4d12+14",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 4,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "4d12+14",
				},
			],
		},
	],
	tags: [],
});
