import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warlocks_robe",
	name: "Warlock's Robe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IEe884qFB7RpSqQ2U?alt=media&token=b1401c6f-63f5-464a-b4e3-75013ebf7204",
	level: 4,
	price: 1620,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	type: "armour",
});
