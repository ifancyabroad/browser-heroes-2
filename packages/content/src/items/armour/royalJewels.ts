import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "royal_jewels",
	name: "Royal Jewels",
	description: "A Royal Amulet that bestows wisdom and strength to its wearer.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9VHPby4Av3Pn5SXOI?alt=media&token=9511fe08-1d1b-4738-906c-964598c1b9f5",
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
