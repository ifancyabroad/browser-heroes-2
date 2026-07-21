import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "cloak_of_shadows",
	name: "Cloak of Shadows",
	description: "A lasting veil of shadow dulls elemental harm.",
	icon: "skills/feats/cloak_of_shadows.png",
	category: "defensive",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	attackRiders: [],
	tags: ["assassin"],
});
