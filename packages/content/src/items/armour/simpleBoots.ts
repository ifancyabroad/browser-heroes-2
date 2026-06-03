import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "simple_boots",
	name: "Simple Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHs5C67jfZbgP5mj0n4?alt=media&token=cdde785b-0c76-4fce-b52a-cbe295ca2a3f",
	level: 2,
	price: 200,
	armourType: "misc",
	properties: [
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
	],
	type: "boots",
});
