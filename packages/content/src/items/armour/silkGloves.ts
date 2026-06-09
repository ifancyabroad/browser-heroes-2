import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "silk_gloves",
	name: "Silk Gloves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsYtmhF3Mc-4-848Du?alt=media&token=36cbd4e6-c3d8-466c-9fa3-26b040b1d179",
	price: 290,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 25,
		},
	],
	tags: [],
});
