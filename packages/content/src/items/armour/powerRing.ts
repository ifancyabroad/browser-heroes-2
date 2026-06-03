import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "power_ring",
	name: "Power Ring",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1MDwu1ZSnDhqMV0cS?alt=media&token=b1c0ad2e-802d-43c8-81b7-4cbbe7f261d5",
	level: 3,
	price: 720,
	armourType: "misc",
	properties: [
		{
			name: "crushing",
			type: "damage",
			value: 40,
		},
	],
	type: "ring",
});
