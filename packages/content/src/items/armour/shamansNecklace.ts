import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shamans_necklace",
	name: "Shaman's Necklace",
	description: "A shamanic necklace that aligns the wearer with elemental forces.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9T7n-ofuYXGZbdLuo?alt=media&token=72e6f662-055a-441a-bd37-385c7c2fdbff",
	level: 2,
	price: 320,
	armourType: "misc",
	properties: [
		{
			name: "lightning",
			type: "damage",
			value: 20,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
	],
	type: "amulet",
});
