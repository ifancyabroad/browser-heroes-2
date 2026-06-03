import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "tundra_charm",
	name: "Tundra Charm",
	description: "A ring adorned with ice crystals, granting resilience in frigid environments.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEihz88uE1-KftrLns?alt=media&token=2255a077-ce05-46af-a5f8-ee537d3117a9",
	level: 3,
	price: 680,
	armourType: "misc",
	properties: [
		{
			name: "cold",
			type: "damage",
			value: 40,
		},
	],
	type: "ring",
});
