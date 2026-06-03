import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_crown",
	name: "Gold Crown",
	description: "This helm combines golden splendor with superior protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEN4ov5P7JEqbkdb4A?alt=media&token=2c43cba5-5594-44a4-baee-153c157f36f9",
	level: 4,
	price: 1520,
	armourType: "misc",
	properties: [
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	type: "helmet",
});
