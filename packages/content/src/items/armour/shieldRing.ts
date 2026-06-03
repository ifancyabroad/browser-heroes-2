import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shield_ring",
	name: "Shield Ring",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsIE3Q4T6mcVx7TslH?alt=media&token=8f167d60-0897-4ebd-a26f-7af404474b1e",
	level: 2,
	price: 350,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 10,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 10,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 10,
		},
	],
	type: "ring",
});
