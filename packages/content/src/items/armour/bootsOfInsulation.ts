import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "boots_of_insulation",
	name: "Boots of Insulation",
	description: "Insulated boots that provide warmth in freezing climates.",
	icon: "items/armour/boots/Boots_31.png",
	price: 1550,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
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
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
	],
	tags: [],
});
