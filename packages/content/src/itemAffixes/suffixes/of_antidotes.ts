import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_antidotes",
	name: "of Antidotes",
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
			damageType: "poison",
		},
	],
});
