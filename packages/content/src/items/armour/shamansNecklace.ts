import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shamans_necklace",
	name: "Shaman's Necklace",
	description: "A shamanic necklace that aligns the wearer with elemental forces.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9T7n-ofuYXGZbdLuo?alt=media&token=72e6f662-055a-441a-bd37-385c7c2fdbff",
	price: 320,
	rarity: "uncommon",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
