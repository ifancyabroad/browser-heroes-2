import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "slashing_mastery",
	name: "Slashing Mastery",
	description: "Slashing damage is multiplied by 1.2.",
	icon: "skills/barbarian/cleave.png",
	category: "offensive",
	modifiers: [
		{ type: "modifyDamage", damageType: "slashing", operation: "multiply", value: 1.2 },
	],
	attackRiders: [],
	tags: [],
});
