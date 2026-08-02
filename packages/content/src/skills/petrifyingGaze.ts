import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "petrifying_gaze",
	name: "Petrifying Gaze",
	icon: "skills/common/petrifying_gaze.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	maxUses: 1,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
		},
	],
	tags: [],
});
