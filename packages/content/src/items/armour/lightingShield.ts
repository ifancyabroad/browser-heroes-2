import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "lighting_shield",
	name: "Lighting Shield",
	description: "A shield imbued with lightning magic, deflecting attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEfJdAyhMkjgDYnm8R?alt=media&token=3da49619-7acd-48ef-9f25-efea603393a6",
	level: 2,
	price: 280,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 40,
		},
	],
	type: "shield",
});
