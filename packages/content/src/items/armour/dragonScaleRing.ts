import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragon_scale_ring",
	name: "Dragon Scale Ring",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1MiTvdUnzhJdRDcyC?alt=media&token=e54a528f-eff4-4336-9261-b59826ee4b1a",
	level: 4,
	price: 1650,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "resistance",
			value: 25,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 25,
		},
		{
			name: "cold",
			type: "resistance",
			value: 25,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	type: "ring",
});
