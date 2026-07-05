import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_the_ice_mage",
	name: "Robe of the Ice Mage",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IAuNHTkw0VVfFPd7b?alt=media&token=2e12287a-ee54-49b7-aa03-611d11386bfd",
	price: 780,
	rarity: "rare",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 25,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
