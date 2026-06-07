import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadow_bolt",
	name: "Shadow Bolt",
	description: "Hurl a bolt of shadow energy at your target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh3v9mXEeAJhlsZfwB?alt=media&token=3ac3e157-3f26-4716-b546-4ce5f00ef032",
	pool: "warlock",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 12,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "1d10",
					attribute: "intelligence",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
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
					dice: "2d10-3",
					attribute: "intelligence",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
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
					dice: "2d10-1",
					attribute: "intelligence",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
					durationTurns: 3,
				},
			],
		},
	],
	tags: [],
});
