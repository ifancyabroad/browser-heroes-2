import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "amulet_of_light",
	name: "Amulet of Light",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgO7BPLLUJS5JjAH6o0?alt=media&token=45324fb0-b7ce-4001-a85a-b001f9968eb5",
	level: 1,
	price: 80,
	armourType: "misc",
	properties: [
		{
			name: "radiant",
			type: "resistance",
			value: 40,
		},
	],
	type: "amulet",
});
