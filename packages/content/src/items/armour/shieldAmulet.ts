import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shield_amulet",
	name: "Shield Amulet",
	description: "This amulet fortifies defenses, serving as a bulwark against harm.",
	icon: "items/armour/neck/Neck_b_01.png",
	price: 3800,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
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
	],
	tags: [],
});
