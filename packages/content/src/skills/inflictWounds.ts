import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "inflict_wounds",
	name: "Inflict Wounds",
	description:
		"Channel dark energy to deal necrotic damage with a chance to cause ongoing bleeding.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6NWgjfh9IAA7mMhg-?alt=media&token=51a6d406-36c1-4a37-8e4c-249db8aaed00",
	pool: "occultist",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 8,
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
					attribute: "wisdom",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 4,
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
					attribute: "wisdom",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 5,
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
					attribute: "wisdom",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
