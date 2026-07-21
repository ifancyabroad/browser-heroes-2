import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "enhance_poison",
	name: "Venom Craft",
	description: "Practiced toxin handling adds poison damage to your attacks.",
	icon: "skills/feats/enhance_poison.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: ["assassin"],
});
