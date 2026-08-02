import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "fire_mastery",
	name: "Fire Mastery",
	description: "Fire damage is multiplied by 1.2.",
	icon: "skills/warlock/fireball.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [{ type: "modifyDamage", damageType: "fire", operation: "multiply", value: 1.2 }],
	attackRiders: [],
	tags: [],
});
