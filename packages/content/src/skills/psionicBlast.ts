import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "psionic_blast",
	name: "Psionic Blast",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3JZltm890qLBu0MtB?alt=media&token=004fdcea-3a31-425c-9f87-c9050ac4cb2b",
	pool: "common",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 2,
		save: {
			attribute: "constitution",
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
					statusId: "stun",
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
					statusId: "stun",
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
					statusId: "stun",
					durationTurns: 3,
				},
			],
		},
	],
	tags: [],
});
