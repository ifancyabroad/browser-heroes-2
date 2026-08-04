import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "lightning_mastery",
	name: "Lightning Mastery",
	description: "Lightning damage is multiplied by 1.25.",
	icon: "feats/Skill_LightningUltimate_nb.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "multiply",
			value: 1.25,
		},
	],
	attackRiders: [],
	tags: [],
});
