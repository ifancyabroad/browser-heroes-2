import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "poison_resistant_boots",
	name: "Poison Resistant Boots",
	description: "These boots shield the wearer from poison.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDJkRq2hFzUkbrhgnp?alt=media&token=14effb20-a458-4ea8-93a6-fa976e1f4519",
	price: 90,
	rarity: "common",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
	],
	tags: [],
});
