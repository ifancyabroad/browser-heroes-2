import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dancing_defense",
	name: "Dancing Defense",
	description:
		"Greatly increases defense and chance for a critical strike with rhythmic movement.",
	icon: "skills/warrior/dancing_defense.png",
	pool: "warrior",
	kind: "technique",
	category: "buff",
	maxUses: 4,
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
			value: 1,
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 3,
			durationTurns: 3,
		},
	],
	tags: [],
});
