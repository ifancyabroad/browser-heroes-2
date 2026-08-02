import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "taunt",
	name: "Taunt",
	description:
		"Provoke the enemy into attacking recklessly, making their attacks more accurate but leaving them dangerously exposed.",
	icon: "skills/barbarian/taunt.png",
	pool: "barbarian",
	kind: "technique",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "advantage",
			durationTurns: 2,
		},
		{
			type: "modifyDamageTaken",
			target: "enemy",
			operation: "multiply",
			value: 2,
			durationTurns: 3,
		},
	],
	tags: [],
});
