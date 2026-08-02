import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "regeneration",
	name: "Regeneration",
	description: "Begin regenerating damaged tissue steadily over several turns.",
	icon: "skills/common/regeneration.png",
	pool: "common",
	kind: "technique",
	category: "heal",
	maxUses: 2,
	effects: [
		{
			type: "healOverTime",
			target: "self",
			dice: "1d8",
			durationTurns: 4,
		},
	],
	tags: [],
});
