import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "divine_protection",
	name: "Divine Protection",
	description: "A quiet celestial ward protects against holy and profane force.",
	icon: "skills/feats/divine_protection.png",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "radiant",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
	],
	attackRiders: [],
	tags: ["cleric"],
});
