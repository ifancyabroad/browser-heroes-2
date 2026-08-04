import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "toughness",
	name: "Toughness",
	description: "Hard-earned resilience increases maximum HP by 20.",
	icon: "feats/Skill_Muscles_nb.png",
	kind: "training",
	category: "defensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 20,
		},
	],
	attackRiders: [],
	tags: [],
});
