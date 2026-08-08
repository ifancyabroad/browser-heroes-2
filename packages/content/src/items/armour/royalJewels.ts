import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "royal_jewels",
	name: "Royal Jewels",
	description: "A royal amulet that bestows presence, resilience, and wisdom upon its wearer.",
	icon: "items/armour/neck/Neck_b_10.png",
	price: 3400,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 4,
		},
	],
	tags: [],
});
