import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_boots",
	name: "Dreadfather's Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG0CyLGHeCq5_-8P8o?alt=media&token=e61a228c-9a06-4619-aa21-edbe62bf0c52",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "crushing",
			type: "damage",
			value: 40,
		},
	],
	characterClass: "-OHcffU4_J4vJV5nPD1l",
	type: "boots",
});
