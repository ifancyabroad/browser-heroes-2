import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_shadowing",
	name: "of Shadowing",
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
			damageType: "radiant",
		},
	],
});
