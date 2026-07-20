import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_acid_warding",
	name: "of Acid Warding",
	position: "suffix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["armour"],
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "acid",
		},
	],
});
