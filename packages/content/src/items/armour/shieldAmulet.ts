import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shield_amulet",
	name: "Shield Amulet",
	description: "This amulet fortifies defenses, serving as a bulwark against harm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9Yd_qnAfg6Q5Ue1mG?alt=media&token=f9850689-b16a-4c57-9538-40aa7ab04b94",
	level: 4,
	price: 1560,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 25,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 25,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 25,
		},
	],
	type: "amulet",
});
