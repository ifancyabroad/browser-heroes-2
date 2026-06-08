import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "berserk",
	name: "Berserk",
	description: "Become enraged, greatly increasing strength but lowering defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqTywT0RDubTou99c2?alt=media&token=9ea978e7-bc94-4343-b045-7054eaea6455",
	pool: "common",
	category: "buff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 8,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: -4,
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 12,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: -6,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 16,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: -8,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
