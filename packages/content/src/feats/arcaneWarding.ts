import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "arcane_warding",
	name: "Arcane Warding",
	description: "Protective study grants lasting resistance to elemental harm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh7BnVOa0W7OdE_0YR?alt=media&token=7028320b-a438-495b-a8b3-bc22e011b81a",
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
