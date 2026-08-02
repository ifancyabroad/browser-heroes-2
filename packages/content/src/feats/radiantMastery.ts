import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "radiant_mastery",
	name: "Radiant Mastery",
	description: "Radiant damage is multiplied by 1.2.",
	icon: "skills/cleric/holy_strike.png",
	category: "elemental",
	modifiers: [{ type: "modifyDamage", damageType: "radiant", operation: "multiply", value: 1.2 }],
	attackRiders: [],
	tags: [],
});
