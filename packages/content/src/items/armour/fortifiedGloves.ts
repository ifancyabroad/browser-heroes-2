import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "fortified_gloves",
	name: "Fortified Gloves",
	description: "Insulated gloves, shielding hands from bitter cold and frost.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NNvLkVyFUS4L9Zio2lO?alt=media&token=a7399be8-2084-424e-ba6c-c90cafd7b831",
	level: 1,
	price: 70,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 20,
		},
	],
	type: "gloves",
});
