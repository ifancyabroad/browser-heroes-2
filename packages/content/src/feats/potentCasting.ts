import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "potent_casting",
	name: "Potent Casting",
	description: "Magical damage is multiplied by 1.5, but saving throws are reduced by 4.",
	icon: "feats/Aura_Wizards_nb.png",
	kind: "spellcraft",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: -4,
		},
	],
	attackRiders: [],
	tags: [],
});
