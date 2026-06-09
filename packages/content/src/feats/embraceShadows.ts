import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "embrace_shadows",
	name: "Shadow Affinity",
	description: "Necrotic energy permanently clings to your spellwork.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh4hPWuWx_NN1YApGU?alt=media&token=deb4a7d0-86c8-4750-afea-79b9730efece",
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
