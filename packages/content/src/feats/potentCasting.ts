import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "potent_casting",
	name: "Potent Casting",
	description: "Increase your magical damage dealt at the cost of your maximum HP.",
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
			stat: "maxHpBonus",
			value: -20,
		},
	],
	attackRiders: [],
	tags: [],
});
