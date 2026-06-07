import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "natures_blessing",
	name: "Nature's Blessing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJm2T4y5k9f0MN-4kj?alt=media&token=d0857ca6-b8ff-4b20-b107-967bc65dcc87",
	pool: "common",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 3,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 75,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 113,
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 150,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
