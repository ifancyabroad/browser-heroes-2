import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_armour",
	name: "Gold Armour",
	description: "Gilded in enchantments, this gold-plated armor radiates magical protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NZN-pDbqOJ2N6bjuW-2?alt=media&token=65f41764-04fb-45e4-b574-b4c9dde99b5c",
	level: 4,
	price: 1760,
	armourClass: 18,
	armourType: "heavy",
	properties: [
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
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	type: "armour",
});
