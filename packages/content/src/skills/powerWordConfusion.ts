import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_confusion",
	name: "Power Word: Confusion",
	description:
		"Speak a disorienting word that may disrupt the enemy's attacks and silence their abilities.",
	icon: "skills/occultist/power_word_confusion.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 4,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "silenced",
			durationTurns: 4,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
