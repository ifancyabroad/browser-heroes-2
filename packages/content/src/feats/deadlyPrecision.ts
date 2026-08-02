import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "deadly_precision",
	name: "Deadly Precision",
	description: "Precise attacks increase critical range by 1.",
	icon: "skills/feats/Skill_MonsteHunter_nb.png",
	kind: "training",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 1,
		},
	],
	attackRiders: [],
	tags: [],
});
