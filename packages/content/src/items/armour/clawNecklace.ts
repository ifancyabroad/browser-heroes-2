import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "claw_necklace",
	name: "Claw Necklace",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsUXsy69ii40yOql8k?alt=media&token=81c58c24-8030-4be2-b85a-a9f50faad7ff",
	level: 2,
	price: 270,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 25,
		},
	],
	type: "amulet",
});
