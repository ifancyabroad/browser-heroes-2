import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "cold_mastery",
	name: "Cold Mastery",
	description: "Cold damage is multiplied by 1.2.",
	icon: "skills/mage/frost_arrow.png",
	category: "elemental",
	modifiers: [{ type: "modifyDamage", damageType: "cold", operation: "multiply", value: 1.2 }],
	attackRiders: [],
	tags: [],
});
