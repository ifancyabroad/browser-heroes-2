import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "dancers_grace",
	name: "Dancer's Grace",
	description: "Measured movement improves defense without sacrificing precision.",
	icon: "skills/feats/dancers_grace.png",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["warrior"],
});
