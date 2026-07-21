import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "royal_jewels",
	name: "Royal Jewels",
	description: "A Royal Amulet that bestows wisdom and strength to its wearer.",
	icon: "items/armour/neck/Neck_b_10.png",
	price: 1200,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
