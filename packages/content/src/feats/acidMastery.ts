import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "acid_mastery",
	name: "Acid Mastery",
	description: "Acid damage is multiplied by 1.2.",
	icon: "skills/rogue/acid_coating.png",
	kind: "damageMastery",
	category: "offensive",
	modifiers: [{ type: "modifyDamage", damageType: "acid", operation: "multiply", value: 1.2 }],
	attackRiders: [],
	tags: [],
});
