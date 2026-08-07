import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_wing",
	name: "Gold Wing",
	description: "A shield crafted with golden wings, symbolizing protection and swift defense.",
	icon: "items/armour/shields/shield_48.png",
	price: 1420,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	armourClass: 1,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
