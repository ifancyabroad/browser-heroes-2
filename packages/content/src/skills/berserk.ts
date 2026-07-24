import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "berserk",
	name: "Berserk",
	description: "Become enraged, greatly increasing offensive power but lowering defenses.",
	icon: "skills/common/berserk.png",
	pool: "common",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			operation: "add",
			value: 4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
