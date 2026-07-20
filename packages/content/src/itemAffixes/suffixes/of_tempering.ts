import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_tempering",
	name: "of Tempering",
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
			damageType: "slashing",
		},
	],
});
