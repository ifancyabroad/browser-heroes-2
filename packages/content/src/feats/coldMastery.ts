import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "cold_mastery",
	name: "Cold Mastery",
	description: "Cold damage is multiplied by 1.2.",
	icon: "skills/feats/Aura_Frost_nb.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "multiply",
			value: 1.2,
		},
	],
	attackRiders: [],
	tags: [],
});
