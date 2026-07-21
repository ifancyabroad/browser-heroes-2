import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_armour",
	name: "Gold Armour",
	description: "Gilded in enchantments, this gold-plated armor radiates magical protection.",
	icon: "items/armour/chest/Chest_17.png",
	price: 1760,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 18,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
