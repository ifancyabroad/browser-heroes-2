import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "piercing_mastery",
	name: "Piercing Mastery",
	description: "Piercing damage is multiplied by 1.2.",
	icon: "skills/assassin/backstab.png",
	category: "offensive",
	modifiers: [
		{ type: "modifyDamage", damageType: "piercing", operation: "multiply", value: 1.2 },
	],
	attackRiders: [],
	tags: [],
});
