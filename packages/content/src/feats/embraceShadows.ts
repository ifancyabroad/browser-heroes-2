import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "embrace_shadows",
	name: "Shadow Affinity",
	description: "Necrotic energy permanently clings to your spellwork.",
	icon: "skills/feats/embrace_shadows.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: ["warlock"],
});
