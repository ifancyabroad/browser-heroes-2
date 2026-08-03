import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_grounding",
	name: "of Grounding",
	position: "suffix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["armour"],
		armourSlots: ["body", "shield", "boots", "amulet", "ring"],
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
});
