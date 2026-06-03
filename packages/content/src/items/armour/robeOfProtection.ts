import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_protection",
	name: "Robe of Protection",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy42jVE0Jqj3DYOJCU?alt=media&token=5dc705ba-abfc-47bd-a3f7-758ddb165a32",
	level: 4,
	price: 1700,
	armourClass: 10,
	armourType: "cloth",
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
	type: "armour",
});
