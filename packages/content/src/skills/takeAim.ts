import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "take_aim",
	name: "Take Aim",
	description: "Steady your aim to make the next sequence of attacks exceptionally precise.",
	icon: "skills/common/take_aim.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "common",
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
			value: 2,
			durationTurns: 3,
		},
	],
	tags: [],
});
