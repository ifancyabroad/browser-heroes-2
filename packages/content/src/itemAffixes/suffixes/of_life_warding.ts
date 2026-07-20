import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_life_warding",
	name: "of Life Warding",
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
			damageType: "necrotic",
		},
	],
});
