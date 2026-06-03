import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "horrifying_mask",
	name: "Horrifying Mask",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy2JrV38T0OjNW-WBV?alt=media&token=2e3812ea-efd7-4a3a-80b3-456a6fda7425",
	level: 4,
	price: 1450,
	armourType: "misc",
	properties: [
		{
			name: "charisma",
			type: "stat",
			value: -2,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 4,
		},
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
	],
	type: "helmet",
});
