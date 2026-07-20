import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_stability",
	name: "of Stability",
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
			damageType: "crushing",
		},
	],
});
