import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warding_necklace",
	name: "Warding Necklace",
	description: "A warding necklace offering potent protection against dark forces.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9RB3OhlZP2rGnxom1?alt=media&token=07407f45-1c6e-4fdb-8ec4-9ab6799671f8",
	price: 80,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
	],
	tags: [],
});
