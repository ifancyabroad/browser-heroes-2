import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_wraps",
	name: "Dreadfather's Wraps",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG0OXwqPAwR5m2ygYs?alt=media&token=897cf442-4b9a-4ff9-bfa8-85cbc82bb890",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 40,
		},
		{
			name: "radiant",
			type: "resistance",
			value: 40,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-OHcffU4_J4vJV5nPD1l",
	type: "gloves",
});
