import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "royal_jewels",
	name: "Royal Jewels",
	description: "A Royal Amulet that bestows wisdom and strength to its wearer.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9VHPby4Av3Pn5SXOI?alt=media&token=9511fe08-1d1b-4738-906c-964598c1b9f5",
	level: 4,
	price: 1200,
	armourType: "misc",
	properties: [
		{
			name: "charisma",
			type: "stat",
			value: 3,
		},
		{
			name: "constitution",
			type: "stat",
			value: 3,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 3,
		},
	],
	type: "amulet",
});
