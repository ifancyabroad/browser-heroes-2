import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "holy_band",
	name: "Holy Band",
	description: "A band blessed by divine powers, offering protection against dark forces.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEhe4hPN0nCGqfx5Mm?alt=media&token=75289b31-bd0e-4d91-bbc7-46d4edcd4cb4",
	level: 3,
	price: 750,
	armourType: "misc",
	properties: [
		{
			name: "necrotic",
			type: "resistance",
			value: 20,
		},
		{
			name: "radiant",
			type: "damage",
			value: 40,
		},
	],
	type: "ring",
});
