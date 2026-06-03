import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_gauntlets",
	name: "Sunforged Gauntlets",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGBXAOwBUmfrf0GEI1?alt=media&token=d6576c96-1cfe-425f-b02a-63cfb95171b5",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 40,
		},
		{
			name: "slashing",
			type: "resistance",
			value: 20,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-OI71oq4C31il2XnXrif",
	type: "gloves",
});
