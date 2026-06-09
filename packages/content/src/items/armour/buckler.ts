import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "buckler",
	name: "Buckler",
	description: "Basic yet dependable, an essential companion for any aspiring adventurer.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgJzNDx7O2sLwCLS8rd?alt=media&token=5896ce43-f035-4706-b700-1b59b1b2cdc9",
	price: 10,
	rarity: "common",
	type: "armour",
	slot: "shield",
	category: "shield",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
