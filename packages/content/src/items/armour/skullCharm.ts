import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "skull_charm",
	name: "Skull Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsDmNL0hFSSAeriHAg?alt=media&token=e9a76574-79b3-4f08-9c03-b2deaa6d4eab",
	price: 100,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
