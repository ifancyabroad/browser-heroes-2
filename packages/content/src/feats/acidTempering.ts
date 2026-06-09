import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "acid_tempering",
	name: "Acid Tempering",
	description: "Long practice with corrosive compounds strengthens your acid damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZq_nhusxIdvv9LFwJZ?alt=media&token=aa5812ba-62fc-4ec5-a1cc-de61023e265c",
	category: "elemental",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: ["rogue"],
});
