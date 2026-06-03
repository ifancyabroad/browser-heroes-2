import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "lightning_masters_gloves",
	name: "Lightning Master's Gloves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1jCaYmHOx_VrKAtSh?alt=media&token=147ed7cf-4802-48a3-b802-3ef0a2de0e65",
	level: 3,
	price: 720,
	armourType: "misc",
	properties: [
		{
			name: "lightning",
			type: "damage",
			value: 40,
		},
	],
	type: "gloves",
});
