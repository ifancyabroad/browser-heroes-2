import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_venomless",
	name: "of the Venomless",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: {
		itemTypes: ["armour"],
		armourSlots: ["helmet", "gloves", "boots", "belt", "ring"],
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "poison",
		},
	],
});
