import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "necrotic_mastery",
	name: "Necrotic Mastery",
	description: "Necrotic damage is multiplied by 1.25.",
	icon: "skills/feats/Aura_ShadowPresence_nb.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "multiply",
			value: 1.25,
		},
	],
	attackRiders: [],
	tags: [],
});
