import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "berserk",
	name: "Berserk",
	description: "Become enraged, greatly increasing strength but lowering defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqTywT0RDubTou99c2?alt=media&token=9ea978e7-bc94-4343-b045-7054eaea6455",
	pool: "common",
	category: "buff",
	maxUses: 4,
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
	tags: [],
});
