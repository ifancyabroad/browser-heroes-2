import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_greaves",
	name: "Sunforged Greaves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGAnTlbkzA3DMLPVrC?alt=media&token=02d97c5c-db82-428f-819b-4f678f41b5f8",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "crushing",
			type: "damage",
			value: 40,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 20,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-OI71oq4C31il2XnXrif",
	type: "boots",
});
