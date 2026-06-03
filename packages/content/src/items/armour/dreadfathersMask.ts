import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_mask",
	name: "Dreadfather's Mask",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG-CccF8VTd7BELo99?alt=media&token=8c3323c4-e2a4-487d-a68f-e99fad2ebb2f",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "charisma",
			type: "stat",
			value: -4,
		},
	],
	characterClass: "-OHcffU4_J4vJV5nPD1l",
	type: "helmet",
});
