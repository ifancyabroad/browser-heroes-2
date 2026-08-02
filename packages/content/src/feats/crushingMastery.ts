import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "crushing_mastery",
	name: "Crushing Mastery",
	description: "Crushing damage is multiplied by 1.2.",
	icon: "skills/warrior/mighty_blow.png",
	category: "offensive",
	modifiers: [
		{ type: "modifyDamage", damageType: "crushing", operation: "multiply", value: 1.2 },
	],
	attackRiders: [],
	tags: [],
});
