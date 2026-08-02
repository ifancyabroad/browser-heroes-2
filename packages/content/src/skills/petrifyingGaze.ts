import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "petrifying_gaze",
	name: "Petrifying Gaze",
	description:
		"Fix the enemy with a supernatural gaze that may temporarily turn their body to stone.",
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
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution", bonus: 2 },
			},
		},
	],
	tags: [],
});
