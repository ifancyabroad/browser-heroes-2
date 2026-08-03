import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_eclipse",
	name: "of the Eclipse",
	position: "suffix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["helmet", "amulet", "ring"],
		},
	],
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "radiant",
		},
	],
});
