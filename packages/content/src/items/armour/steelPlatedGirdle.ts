import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "steel_plated_girdle",
	name: "Steel Plated Girdle",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHrcGna4xel3CSG1Amx?alt=media&token=d9acd34d-605e-4ea0-b9ab-997a7693d0b1",
	level: 3,
	price: 680,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 15,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 15,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 15,
		},
	],
	type: "belt",
});
