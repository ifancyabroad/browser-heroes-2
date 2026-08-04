import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "keen_intellect",
	name: "Keen Intellect",
	description: "A brilliant mind increases Intelligence by 2.",
	icon: "feats/Aura_Wizard_nb.png",
	kind: "attribute",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
