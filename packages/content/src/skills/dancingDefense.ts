import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dancing_defense",
	name: "Dancing Defense",
	description: "Flow between attack and defense with rhythmic, evasive movement.",
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
			durationTurns: 5,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 3,
			durationTurns: 5,
		},
	],
	tags: [],
});
