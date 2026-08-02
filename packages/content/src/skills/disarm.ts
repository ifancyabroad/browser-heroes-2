import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "disarm",
	name: "Disarm",
	description: "Attempt to disarm the enemy.",
	icon: "skills/common/disarm.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 3,
		},
	],
	tags: [],
});
