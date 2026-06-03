import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "magisters_robe",
	name: "Magister's Robe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IBW2DtLpMhCINfrZL?alt=media&token=50e79530-66d9-41b1-8f18-4c3122d54538",
	level: 2,
	price: 350,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	type: "armour",
});
