import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_fire_warding",
	name: "of Fire Warding",
	position: "suffix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["body", "shield", "boots", "amulet", "ring"],
		},
	],
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
});
