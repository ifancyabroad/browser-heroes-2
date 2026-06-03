import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_plated_shield",
	name: "Gold Plated Shield",
	description: "A shield plated in gleaming gold, both opulent and resilient in defense.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEgBl4DzwpCf-EQ7W1?alt=media&token=392e7209-e5d8-49d0-88f0-872dc9be45eb",
	level: 3,
	price: 840,
	armourType: "heavy",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 3,
		},
		{
			name: "cold",
			type: "resistance",
			value: 20,
		},
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
	],
	type: "shield",
});
