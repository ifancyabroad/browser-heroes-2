import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "frost_infused_boots",
	name: "Frost Infused Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1r_fRvqi1qy1px1Po?alt=media&token=31e819f6-a956-4620-a6f3-86c78b56c8f0",
	price: 580,
	rarity: "common",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
