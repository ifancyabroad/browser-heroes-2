import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_belt",
	name: "Sunforged Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGC1hWyA2ruLPelg1R?alt=media&token=d2698a69-edaa-445d-940d-ef2f4bab0709",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-OI71oq4C31il2XnXrif",
	type: "belt",
});
