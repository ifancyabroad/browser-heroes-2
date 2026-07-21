import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "acid_tempering",
	name: "Acid Tempering",
	description: "Long practice with corrosive compounds strengthens your acid damage.",
	icon: "skills/feats/acid_tempering.png",
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
