import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "curse",
	name: "Curse",
	description:
		"Lay a malignant curse that may leave the enemy vulnerable to further afflictions.",
	icon: "skills/occultist/curse.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			durationTurns: 6,
			save: {
				attribute: "charisma",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
