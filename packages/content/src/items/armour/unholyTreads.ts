import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_treads",
	name: "Unholy Treads",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD683rsaEy2yBxeo8Fw?alt=media&token=c33fc687-7c41-41f7-8523-718a76267dee",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
	],
	characterClass: "-N_Ot99GWjYjrv9Gs-fP",
	type: "boots",
});
