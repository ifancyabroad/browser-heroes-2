import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "arcane_warding",
	name: "Arcane Warding",
	description: "Protective study grants lasting resistance to elemental harm.",
	icon: "skills/feats/arcane_warding.png",
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
	tags: ["mage"],
});
