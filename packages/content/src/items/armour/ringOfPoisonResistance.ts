import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ring_of_poison_resistance",
	name: "Ring of Poison Resistance",
	description: "A ring that grants resistance against harmful poisons.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEQlT7a5v8nuldO2WS?alt=media&token=b6e08ced-2d2e-4709-9929-f0868687d916",
	level: 1,
	price: 80,
	armourType: "misc",
	properties: [
		{
			name: "poison",
			type: "resistance",
			value: 40,
		},
	],
	type: "ring",
});
