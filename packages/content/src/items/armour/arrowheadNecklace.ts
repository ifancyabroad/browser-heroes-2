import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "arrowhead_necklace",
	name: "Arrowhead Necklace",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1SPl3-BEbYqzNelOe?alt=media&token=a5cd633d-7fc8-480a-b665-26f0ea936407",
	price: 700,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
