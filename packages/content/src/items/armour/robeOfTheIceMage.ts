import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_the_ice_mage",
	name: "Robe of the Ice Mage",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IAuNHTkw0VVfFPd7b?alt=media&token=2e12287a-ee54-49b7-aa03-611d11386bfd",
	level: 3,
	price: 780,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "cold",
			type: "damage",
			value: 25,
		},
		{
			name: "cold",
			type: "resistance",
			value: 25,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	type: "armour",
});
