import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "hood_of_the_fox",
	name: "Hood of the Fox",
	description: "The Hood of the Fox, an enchanting accessory for those who revel in trickery.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NNvLx5iIM_zb3YGnsNC?alt=media&token=00cbdf99-29c4-4e7f-94da-da8f256e1722",
	price: 120,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
