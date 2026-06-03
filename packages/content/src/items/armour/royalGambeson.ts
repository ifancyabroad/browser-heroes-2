import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "royal_gambeson",
	name: "Royal Gambeson",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I8N2hC8j3lZ5p1Uyi?alt=media&token=98d80f45-4bc7-4770-8839-c86b6308f336",
	level: 2,
	price: 280,
	armourClass: 13,
	armourType: "medium",
	properties: [
		{
			name: "charisma",
			type: "stat",
			value: 2,
		},
	],
	type: "armour",
});
