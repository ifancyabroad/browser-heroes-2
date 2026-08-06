import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "duelist",
	name: "Duelist",
	description: "Attack rolls increase by 3 and critical range by 1.",
	icon: "feats/Skill_MonsteHunter_nb.png",
	kind: "martial",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 1,
		},
	],
	attackRiders: [],
	tags: [],
});
