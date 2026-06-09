import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "arcane_penetration",
	name: "Arcane Penetration",
	description: "Precise spellcraft improves the difficulty of resisting your magic.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc404KHFQ3zZaHpCbe2?alt=media&token=b2a650c7-b8ae-4b7a-93e7-fb8f090a1e85",
	category: "elemental",
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: ["mage"],
});
