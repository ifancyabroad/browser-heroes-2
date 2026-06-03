import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "crown_charm",
	name: "Crown Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHra_lSjcjIhvuICBCI?alt=media&token=4d3137df-1f06-43ec-bca4-668afbd38f11",
	level: 4,
	price: 1400,
	armourType: "misc",
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 40,
		},
		{
			name: "strength",
			type: "stat",
			value: 4,
		},
	],
	type: "amulet",
});
