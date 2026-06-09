import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "elemental_shield",
	name: "Elemental Shield",
	description: "Battlefield discipline teaches you to brace against elemental force.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCz3gjt9HaaTCJh2XIS?alt=media&token=32b231dd-9a2e-4b5d-997c-4647a8fcb717",
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
