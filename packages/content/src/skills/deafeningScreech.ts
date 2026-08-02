import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_screech",
	name: "Deafening Screech",
	description:
		"Release a piercing shriek that may leave the enemy unable to use their abilities.",
	icon: "skills/common/deafening_screech.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "silenced",
			durationTurns: 3,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
