import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "lightning_mastery",
	name: "Lightning Mastery",
	description: "Lightning damage is multiplied by 1.2.",
	icon: "skills/mage/lighting_bolt.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [
		{ type: "modifyDamage", damageType: "lightning", operation: "multiply", value: 1.2 },
	],
	attackRiders: [],
	tags: [],
});
