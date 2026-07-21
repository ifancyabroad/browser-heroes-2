import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ebonstride_footwear",
	name: "Ebonstride Footwear",
	description: "These black plated boots imbue the wearer with the essence of darkness.",
	icon: "items/armour/boots/Boots_12.png",
	price: 1480,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
