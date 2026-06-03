import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ring_of_cold_resistance",
	name: "Ring of Cold Resistance",
	description: "Shields against bitter cold, a ring of unwavering resistance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgJz9XiQvutptUoYpNc?alt=media&token=ef4fd764-7ee4-4463-bd09-ab7e0572e468",
	level: 1,
	price: 90,
	armourType: "misc",
	properties: [
		{
			name: "cold",
			type: "resistance",
			value: 40,
		},
	],
	type: "ring",
});
