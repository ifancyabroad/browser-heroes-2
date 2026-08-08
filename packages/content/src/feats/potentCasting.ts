import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "potent_casting",
	name: "Potent Casting",
	description: "Skill save DC increases by 4, but attack rolls are reduced by 4.",
	icon: "feats/Aura_Wizards_nb.png",
	kind: "spellcraft",
	category: "offensive",
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: -4,
		},
	],
	attackRiders: [],
	tags: [],
});
