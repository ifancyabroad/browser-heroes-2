import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "arrowhead_necklace",
	name: "Arrowhead Necklace",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1SPl3-BEbYqzNelOe?alt=media&token=a5cd633d-7fc8-480a-b665-26f0ea936407",
	level: 3,
	price: 700,
	armourType: "misc",
	properties: [
		{
			name: "piercing",
			type: "damage",
			value: 40,
		},
	],
	type: "amulet",
});
