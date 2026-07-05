import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_armour",
	name: "Gold Armour",
	description: "Gilded in enchantments, this gold-plated armor radiates magical protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NZN-pDbqOJ2N6bjuW-2?alt=media&token=65f41764-04fb-45e4-b574-b4c9dde99b5c",
	price: 1760,
	rarity: "epic",
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
