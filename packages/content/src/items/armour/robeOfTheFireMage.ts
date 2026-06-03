import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_the_fire_mage",
	name: "Robe of the Fire Mage",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IAQSb0DFvLB-gVQ6K?alt=media&token=f336ccd2-9fab-4567-8907-ba1d360b4f28",
	level: 3,
	price: 780,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 25,
		},
		{
			name: "fire",
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
