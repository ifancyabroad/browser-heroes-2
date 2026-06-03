import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ice_guard",
	name: "Ice Guard",
	description: "A shield encased in icy enchantments, warding off attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEd_Qa8Ppnwn6WL86V?alt=media&token=11d6e357-627b-45cb-89c4-6f51dec4aee8",
	level: 2,
	price: 350,
	armourType: "heavy",
	properties: [
		{
			name: "cold",
			type: "resistance",
			value: 40,
		},
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 3,
		},
	],
	type: "shield",
});
