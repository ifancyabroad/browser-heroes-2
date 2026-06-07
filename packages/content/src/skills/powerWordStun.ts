import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_stun",
	name: "Power Word: Stun",
	description:
		"Utter a commanding word that has a chance to stun your enemy, leaving them momentarily helpless.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTTlgwOpa5b9n39404?alt=media&token=39f0bc4a-7510-4187-8e4f-4aa17316cc93",
	pool: "occultist",
	category: "debuff",
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
				bonus: 1,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
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
