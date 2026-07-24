import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "unyielding_guard",
	name: "Unyielding Guard",
	description: "A fearless defensive style improves protection at the cost of precision.",
	icon: "skills/feats/unyielding_guard.png",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: -1,
		},
	],
	attackRiders: [],
	tags: ["barbarian"],
});
