import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "cloak_of_shadows",
	name: "Cloak of Shadows",
	description: "A lasting veil of shadow dulls elemental harm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdUiFhyxCULAsWYJl?alt=media&token=ab345aab-5ea3-49ef-81e8-ed3481946db6",
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
