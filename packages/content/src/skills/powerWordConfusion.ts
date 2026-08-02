import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_confusion",
	name: "Power Word: Confusion",
	description:
		"Speak a disorienting word that has a chance to charm or blind the enemy, leaving them confused and vulnerable.",
	icon: "skills/occultist/power_word_confusion.png",
	pool: "occultist",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 3,
		},
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
