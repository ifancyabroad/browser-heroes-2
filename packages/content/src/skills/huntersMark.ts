import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "hunterss_mark",
	name: "Hunter's Mark",
	description:
		"Mark the enemy as quarry, sharpening attacks and creating opportunities for critical strikes.",
	icon: "skills/common/hunterss_mark.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	maxUses: 2,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 2,
			durationTurns: 4,
		},
	],
	tags: [],
});
