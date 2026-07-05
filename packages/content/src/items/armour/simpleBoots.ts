import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "simple_boots",
	name: "Simple Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHs5C67jfZbgP5mj0n4?alt=media&token=cdde785b-0c76-4fce-b52a-cbe295ca2a3f",
	price: 200,
	rarity: "uncommon",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
