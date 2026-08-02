import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "necrotic_mastery",
	name: "Necrotic Mastery",
	description: "Necrotic damage is multiplied by 1.2.",
	icon: "skills/warlock/shadow_bolt.png",
	category: "elemental",
	modifiers: [
		{ type: "modifyDamage", damageType: "necrotic", operation: "multiply", value: 1.2 },
	],
	attackRiders: [],
	tags: [],
});
