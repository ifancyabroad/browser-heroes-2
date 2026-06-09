import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warlocks_band",
	name: "Warlock's Band",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsaZUhz3Xe2DxxPSB1?alt=media&token=64910295-e52c-4467-81ab-5be37aba514a",
	price: 300,
	rarity: "common",
	type: "armour",
	slot: "ring",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
