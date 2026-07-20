import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_fire_warding",
	name: "of Fire Warding",
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
			damageType: "fire",
		},
	],
});
