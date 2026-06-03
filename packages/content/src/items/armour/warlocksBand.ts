import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warlocks_band",
	name: "Warlock's Band",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsaZUhz3Xe2DxxPSB1?alt=media&token=64910295-e52c-4467-81ab-5be37aba514a",
	level: 2,
	price: 300,
	armourType: "misc",
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 20,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 1,
		},
	],
	type: "ring",
});
