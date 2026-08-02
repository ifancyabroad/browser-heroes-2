import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "potent_casting",
	name: "Potent Casting",
	description: "Focused power increases skill save DC by 2.",
	icon: "skills/feats/Aura_Wizards_nb.png",
	kind: "training",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
