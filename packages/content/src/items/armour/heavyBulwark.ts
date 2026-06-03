import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "heavy_bulwark",
	name: "Heavy Bulwark",
	description: "A massive bulwark of reinforced steel, providing unparalleled defense in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEeCnEpU0OsAmw_Ewj?alt=media&token=9f06009e-be49-49a3-a249-2c75a8a1e088",
	level: 4,
	price: 1280,
	armourType: "heavy",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 4,
		},
		{
			name: "dexterity",
			type: "stat",
			value: -2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 4,
		},
	],
	type: "shield",
});
