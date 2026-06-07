import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "wail",
	name: "Wail",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkZb3a3j2ykQWUtTC0?alt=media&token=068e6888-9b67-4aca-bce4-d315299e625a",
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
				attribute: "wisdom",
				includeProficiency: true,
				bonus: 1,
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
					durationTurns: 2,
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
					durationTurns: 3,
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
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
