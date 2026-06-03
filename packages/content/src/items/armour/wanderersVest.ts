import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "wanderers_vest",
	name: "Wanderer's Vest",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I79hlYuXK4jMUcNxa?alt=media&token=5ceb328d-9036-4b73-ad10-181cb099c749",
	level: 2,
	price: 220,
	armourClass: 13,
	armourType: "medium",
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 20,
		},
		{
			name: "constitution",
			type: "stat",
			value: 1,
		},
	],
	type: "armour",
});
