import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "elemental_shield",
	name: "Elemental Shield",
	description: "Battlefield discipline teaches you to brace against elemental force.",
	icon: "skills/feats/elemental_shield.png",
	category: "elemental",
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
	tags: ["warrior"],
});
