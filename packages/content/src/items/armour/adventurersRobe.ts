import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "adventurers_robe",
	name: "Adventurer's Robe",
	description: "A versatile adventurer's robe, perfect for those seeking the unknown.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nm2GvWJKAW8lLaCcu7n?alt=media&token=bd8faa1f-a72b-47ae-a12d-f7c7f6cc5202",
	level: 1,
	price: 60,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 25,
		},
	],
	type: "armour",
});
