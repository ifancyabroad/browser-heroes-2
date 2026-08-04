import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "acid_mastery",
	name: "Acid Mastery",
	description: "Acid damage is multiplied by 1.25.",
	icon: "feats/Aura_Druid_nb.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "multiply",
			value: 1.25,
		},
	],
	attackRiders: [],
	tags: [],
});
