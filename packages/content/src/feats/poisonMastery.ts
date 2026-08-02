import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "poison_mastery",
	name: "Poison Mastery",
	description: "Poison damage is multiplied by 1.2.",
	icon: "skills/feats/Aura_Filth_nb.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "multiply",
			value: 1.2,
		},
	],
	attackRiders: [],
	tags: [],
});
