import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "frostbinder_charm",
	name: "Frostbinder Charm",
	description: "This Frost Necklace wards off heat and enhances cold-based abilities.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9Ue6ryYmCcBTwKlt_?alt=media&token=b5b63707-2bc7-4040-96ea-ea4ce1dae8bd",
	price: 560,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
