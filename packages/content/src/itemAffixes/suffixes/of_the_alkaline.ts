import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_alkaline",
	name: "of the Alkaline",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["gloves", "boots", "belt", "ring"],
		},
	],
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "acid",
		},
	],
});
