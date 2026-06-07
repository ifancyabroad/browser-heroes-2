import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shield_wall",
	name: "Shield Wall",
	description:
		"Stand resolute with Shield Wall, shielding yourself from harm and repelling enemy assaults with unwavering defense.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhgx8gnKSMnxB7h9F60?alt=media&token=eb3b73bb-3dd1-4891-9ce8-94920b18ee74",
	pool: "common",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 5,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 3,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 5,
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 6,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
