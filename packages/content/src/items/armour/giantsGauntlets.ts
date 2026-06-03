import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "giants_gauntlets",
	name: "Giant's Gauntlets",
	description: "These gauntlets grant the power of giants, crushing foes with ease.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDWVyxvBUSN2fJhVNb?alt=media&token=19380ca9-003d-4319-a1ba-db40e083687e",
	level: 4,
	price: 1590,
	armourType: "misc",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 4,
		},
		{
			name: "crushing",
			type: "damage",
			value: 40,
		},
	],
	type: "gloves",
});
