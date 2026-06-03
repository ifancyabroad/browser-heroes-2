import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warchiefs_breastplate",
	name: "Warchief's Breastplate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I4QK7JVSMY6p__i3L?alt=media&token=444ba759-2ff5-4f6c-bb78-df49c35f2a0b",
	level: 2,
	price: 550,
	armourClass: 16,
	armourType: "heavy",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 1,
		},
		{
			name: "crushing",
			type: "damage",
			value: 20,
		},
	],
	type: "armour",
});
