import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "highwaymans_mask",
	name: "Highwayman's Mask",
	description: "Mask designed for highwaymen, blending stealth with style.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzELC-nYPOXUFCOWA4M?alt=media&token=6f265d3d-7b98-4558-a66c-ea7c475e68cb",
	level: 2,
	price: 290,
	armourType: "misc",
	properties: [
		{
			name: "piercing",
			type: "damage",
			value: 25,
		},
	],
	type: "helmet",
});
