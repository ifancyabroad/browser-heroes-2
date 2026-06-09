import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "divine_protection",
	name: "Divine Protection",
	description: "A quiet celestial ward protects against holy and profane force.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkR-olGXWxxR9Poqo3?alt=media&token=2aa203c7-fff6-4998-b777-bd847ae0773e",
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
