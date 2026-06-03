import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "blessed_wraps",
	name: "Blessed Wraps",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy08l5Cz0vCld2qSHF?alt=media&token=a2641251-e904-47bb-bb42-736a39cb373e",
	level: 3,
	price: 800,
	armourType: "misc",
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 40,
		},
	],
	type: "gloves",
});
