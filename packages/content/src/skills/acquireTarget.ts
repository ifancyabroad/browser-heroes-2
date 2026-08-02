import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acquire_target",
	name: "Acquire Target",
	description:
		"Lock onto the enemy, greatly improving accuracy and critical targeting for a short time.",
	icon: "skills/unique/acquire_target.png",
	pool: "unique",
	kind: "technique",
	category: "buff",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 3,
			durationTurns: 3,
		},
	],
	tags: [],
});
