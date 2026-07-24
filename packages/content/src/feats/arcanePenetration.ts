import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "arcane_penetration",
	name: "Arcane Penetration",
	description: "Precise spellcraft improves the difficulty of resisting your magic.",
	icon: "skills/feats/arcane_penetration.png",
	category: "elemental",
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["mage"],
});
