import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_plate",
	name: "Unholy Plate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8Hs3ZHXox-pIZAXvRF?alt=media&token=89559693-3e4b-4ca4-851d-14a962478b7e",
	level: 4,
	price: 1800,
	armourClass: 18,
	armourType: "heavy",
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
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-N_Ot99GWjYjrv9Gs-fP",
	type: "armour",
});
