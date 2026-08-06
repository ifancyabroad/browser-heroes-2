import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "potent_casting",
	name: "Potent Casting",
	description:
		"Skill save DC increases by 4 and saving throws by 3, but attack rolls are reduced by 3.",
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
			stat: "savingThrowBonus",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: -3,
		},
	],
	attackRiders: [],
	tags: [],
});
