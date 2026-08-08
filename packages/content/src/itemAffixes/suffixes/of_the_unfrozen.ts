import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_unfrozen",
	name: "of the Unfrozen",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["body", "shield", "boots", "amulet", "ring"],
		},
	],
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "cold",
		},
	],
});
