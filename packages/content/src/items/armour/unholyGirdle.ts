import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_girdle",
	name: "Unholy Girdle",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD66llU12DgMI5qRhS2?alt=media&token=6a24f3b5-7c3b-498e-9cb9-410b212cf9ed",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "piercing",
			type: "resistance",
			value: 20,
		},
		{
			name: "piercing",
			type: "damage",
			value: 40,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-N_Ot99GWjYjrv9Gs-fP",
	type: "belt",
});
