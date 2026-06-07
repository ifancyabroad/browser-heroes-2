import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "eye_ray",
	name: "Eye Ray",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3fgWvaJhBd1_Ar0AK?alt=media&token=31bbe6e1-3867-4a52-9b86-20209b2cae4f",
	pool: "unique",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 12,
		save: {
			attribute: "wisdom",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "wisdom",
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
					damageType: "necrotic",
					dice: "2d12+8",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "charm",
					durationTurns: 1,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 1,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 1,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "3d12+11",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "charm",
					durationTurns: 2,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 2,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 2,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "4d12+14",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "charm",
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 3,
				},
			],
		},
	],
	tags: [],
});
