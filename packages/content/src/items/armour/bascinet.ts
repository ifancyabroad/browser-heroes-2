import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "bascinet",
	name: "Bascinet",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEJs3RCx4H78EqaGTc?alt=media&token=50f252da-83d7-4134-ac19-c32c1abb5950",
	level: 2,
	price: 300,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
		{
			name: "slashing",
			type: "resistance",
			value: 20,
		},
	],
	type: "helmet",
});
