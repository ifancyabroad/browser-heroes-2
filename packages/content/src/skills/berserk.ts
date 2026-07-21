import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "berserk",
	name: "Berserk",
	description: "Become enraged, greatly increasing strength but lowering defenses.",
	icon: "skills/common/berserk.png",
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
