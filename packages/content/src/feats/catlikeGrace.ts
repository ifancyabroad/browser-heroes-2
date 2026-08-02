import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "catlike_grace",
	name: "Catlike Grace",
	description: "Supernatural poise increases Dexterity by 2.",
	icon: "skills/feats/Aura_Jump_nb.png",
	kind: "attribute",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
