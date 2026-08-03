import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_deflection",
	name: "of Deflection",
	position: "suffix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["body", "shield", "helmet"],
		},
	],
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
});
